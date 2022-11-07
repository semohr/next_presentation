import { Slide } from "lib/slides";
import { MDXRemote } from "next-mdx-remote";
import { Layouts } from "./Layouts";

/** Slide component parses
 * the slide data and renders it
 * with the correnct Remote component
 * depending on the fontMatter.layout
 *
 *
 */
export default function MdxSlide({
    source,
    fontMatter,
    ...divProps
}: Slide & React.HTMLAttributes<HTMLDivElement>) {
    var components;

    // Parse different layouts to of slides
    if (fontMatter.layout && fontMatter.layout in Layouts) {
        console.log("Using layout", fontMatter.layout);
        components = Layouts[fontMatter.layout];
    } else {
        components = Layouts["default"];
    }

    return (
        <div {...divProps}>
            {source == "NEXT_SLIDE_NOT_FOUND" ? (
                <p>No next slide</p>
            ) : (
                <MDXRemote {...source} components={components} />
            )}
        </div>
    );
}
