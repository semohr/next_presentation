import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

// Where the slides are stored.
export const SLIDES_PATH = path.join(process.cwd(), 'slides');

export interface Slide {
    fontMatter: any;
    source: any;
    notes: any;
}

/** Get a slide from the
 * filesystem. (Server-side only)
 */
export async function getSlide(fName: string): Promise<Slide> {
    const filePath = path.join(SLIDES_PATH, `${fName}.mdx`);
    const source = await fs.readFile(filePath);
    const { content, data } = matter(source);

    // Get all note tags from the slide.
    var notes = '';
    const re = /<Note>(.*?)<\/Note>/gs;
    //matchall
    let match;
    while ((match = re.exec(content))) {
        notes += match[1];
    }

    // Remove all note tags from the slide.
    const slide = content.replaceAll(/<Note>(.*?)<\/Note>/gs, '');

    const mdxNotes = await serialize(notes, { scope: data });

    const mdxSource = await serialize(slide, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: []
        },
        scope: data
    });

    return {
        fontMatter: data,
        source: mdxSource,
        notes: mdxNotes
    };
}

export async function allSlidesSorted(): Promise<Slide[]> {
    // Get all files in folder and folder of folder via glob
    const fileNames = await fs.readdir(SLIDES_PATH);
    const allSlidesData = await Promise.all(
        fileNames.map(async (fileName) => {
            const fName = fileName.replace(/\.mdx$/, '');
            const slide = await getSlide(fName);
            return slide;
        })
    );

    return allSlidesData;
}
