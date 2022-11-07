import { usePresentation } from "lib/context";
import {
    HiOutlinePlay,
    HiOutlineStop,
    HiArrowRight,
    HiArrowLeft,
} from "react-icons/hi2";
import { useEffect } from "react";
import { useCallback } from "react";

import styles from "@theme/presenter.module.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

export default function Controls({ ...divProps }: Props) {
    return (
        <div {...divProps}>
            <Start className={styles.Start} />
            <Stop className={styles.Stop} />
            <Next className={styles.Next} />
            <Previous className={styles.Previous} />
        </div>
    );
}

function Start(props: React.HTMLAttributes<HTMLDivElement>) {
    const { started, setStarted } = usePresentation();

    return (
        <div {...props}>
            <button
                onClick={() => {
                    setStarted(new Date());
                }}
                disabled={started !== undefined}
            >
                <label>Start</label>
                <HiOutlinePlay />
            </button>
        </div>
    );
}
function Stop(props: React.HTMLAttributes<HTMLDivElement>) {
    const { started, setStarted } = usePresentation();
    return (
        <div {...props}>
            <button
                onClick={() => {
                    setStarted(undefined);
                }}
                disabled={started === undefined}
            >
                <label>Stop</label>
                <HiOutlineStop />
            </button>
        </div>
    );
}
function Next(props: React.HTMLAttributes<HTMLDivElement>) {
    const { setNextSlide, slides, currentSlideIndex } = usePresentation();
    const handler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "d") {
                setNextSlide();
            }
        },
        [setNextSlide]
    );
    // Register keyboard handler for right arrow and d
    useEffect(() => {
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [handler]);

    return (
        <div {...props}>
            <button
                onClick={() => {
                    setNextSlide();
                }}
                disabled={currentSlideIndex === slides?.length - 1}
            >
                <label>Next</label>
                <HiArrowRight />
            </button>
        </div>
    );
}
function Previous(props: React.HTMLAttributes<HTMLDivElement>) {
    const { setPreviousSlide, currentSlideIndex } = usePresentation();

    const handler = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft" || e.key === "a") {
                setPreviousSlide();
            }
        },
        [setPreviousSlide]
    );
    // Register keyboard handler for right arrow and d
    useEffect(() => {
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [handler]);

    return (
        <div {...props}>
            <button
                onClick={() => {
                    setPreviousSlide();
                }}
                disabled={currentSlideIndex === 0}
            >
                <label>Previous</label>
                <HiArrowLeft />
            </button>
        </div>
    );
}
