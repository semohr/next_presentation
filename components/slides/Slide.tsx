import { Slide } from 'lib/slides';
import { MDXRemote } from 'next-mdx-remote';
import { Layouts } from './Layouts';

// Import all styles from the layouts of the theme
import styles from '@theme/slides.module.scss';

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
    var classes = styles.slide;

    // Parse different layouts to of slides
    if (fontMatter && fontMatter.layout) {
        // append layout components to components
        const layouts = fontMatter.layout.split(',');
        components = layouts.reduce(
            (acc, layout) => {
                return { ...acc, ...Layouts[layout] };
            },
            { ...Layouts.default }
        );

        // Add styles
        classes += ` ${layouts.map((layout) => styles[layout]).join(' ')}`;
    } else {
        components = { ...Layouts.default };
    }

    return (
        <div {...divProps} className={classes}>
            {source == 'NEXT_SLIDE_NOT_FOUND' ? (
                <h1 style={{ fontSize: '10rem' }}>No next slide</h1>
            ) : (
                <MDXRemote {...source} components={components} />
            )}
        </div>
    );
}
