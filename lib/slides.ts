import path from 'path';
import fs from 'fs/promises';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

// Where the slides are stored.
export const SLIDES_PATH = path.join(process.cwd(), 'slides');

export interface Slide {
    fontMatter: any;
    source: any;
}

/** Get a slide from the
 * filesystem. (Server-side only)
 */
export async function getSlide(fName: string): Promise<Slide> {
    const filePath = path.join(SLIDES_PATH, `${fName}.mdx`);
    const source = await fs.readFile(filePath);
    const { content, data } = matter(source);

    const mdxSource = await serialize(content, {
        // Optionally pass remark/rehype plugins
        mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: []
        },
        scope: data
    });

    return {
        fontMatter: data,
        source: mdxSource
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
