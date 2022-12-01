/** Simple Notes component
 * shows the notes for a given slide in the presenter view
 */

import { usePresentation } from '../../lib/context';

export default function Notes(props) {
    const { currentSlide } = usePresentation();
    return (
        <div {...props}>
            <h1>Notes</h1>
            {JSON.stringify(currentSlide)}
        </div>
    );
}
