import { usePresentation } from "lib/context";
import { useRouter } from "next/router";
import useResizeObserver from "@react-hook/resize-observer";
import { useRef } from "react";
import styles from "@themes/default/slides.module.scss";
import MdxSlide from "components/slides/Slide";

/** Parsed query
 * - preview: boolean (if true, does not update aspect ratio)
 * - next: boolean (if true, shows next slide instead of current)
 */
export default function Index() {
    const { currentSlide, setScreen, nextSlide, isLoading, isError } =
        usePresentation();
    const { query, isReady } = useRouter();
    const container = useRef<HTMLDivElement>(null);

    // Check aspect ratio of container and
    // set aspect ratio of presentation
    useResizeObserver(container, (entry) => {
        if (!isReady || query.preview) return;
        const screen = {
            width: entry.contentRect.width,
            height: entry.contentRect.height,
        };
        setScreen(screen);
    });

    var slide = currentSlide;
    if (query.next) {
        slide = nextSlide;
    }

    // Fetch slide data see api/slides/[number].ts

    // If slide data is not available, show loading
    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error</div>;

    // If slide data is available, show slide
    return (
        <main ref={container} className={styles.main}>
            <MdxSlide {...slide} className={styles.slide} />
        </main>
    );
}
