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
    if (fontMatter && fontMatter.layout && fontMatter.layout in Layouts) {
        // append layout components to components
        components = { ...Layouts[fontMatter.layout], ...Layouts.default };
    } else {
        components = { ...Layouts.default };
    }

    return (
        <div {...divProps}>
            {source == "NEXT_SLIDE_NOT_FOUND" ? (
                <h1 style={{ fontSize: "10rem" }}>No next slide</h1>
            ) : (
                <MDXRemote {...source} components={components} />
            )}
        </div>
    );
}
