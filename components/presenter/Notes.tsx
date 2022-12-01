import { usePresentation } from 'lib/context';
import { MDXRemote } from 'next-mdx-remote';

/** Simple Notes component
 * shows the notes for a given slide in the presenter view
 */
export default function Notes(props) {
    const { currentSlide } = usePresentation();
    return (
        <div {...props}>
            <h1>Notes</h1>
            {currentSlide && currentSlide.notes ? (
                <MDXRemote {...currentSlide.notes} />
            ) : null}
        </div>
    );
}
