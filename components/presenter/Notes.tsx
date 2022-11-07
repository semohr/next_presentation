/** Simple Notes component
 * shows the notes for a given slide in the presenter view
 */

import { usePresentation } from "../../lib/context";

export default function Notes(props) {
    const { slide } = usePresentation();
    return (
        <div {...props}>
            <h1>Notes</h1>
            {JSON.stringify(slide)}
        </div>
    );
}
