import { useEffect, useState } from 'react';
import { usePresentation } from '../../lib/context';

import styles from '@theme/presenter.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    clock?: boolean;
    slideNumber?: boolean;
    timer?: boolean;
}

/** This component shows info in the presenter view
 *
 */
export default function Info({
    clock = true,
    slideNumber = true,
    timer = true,
    ...divProps
}: Props) {
    return (
        <div {...divProps}>
            {slideNumber ? (
                <SlideNumber className={styles.SlideNumber} />
            ) : null}
            {timer ? <Timer className={styles.Timer} /> : null}
            {clock ? <Clock className={styles.Clock} /> : null}
        </div>
    );
}

function Clock(props: React.HTMLAttributes<HTMLDivElement>) {
    const [time, setTime] = useState(new Date());
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!hydrated) {
        return null;
    }
    return <div {...props}>{time.toLocaleTimeString()}</div>;
}

function SlideNumber(props: React.HTMLAttributes<HTMLDivElement>) {
    const { currentSlideIndex, slides } = usePresentation();
    return (
        <div {...props}>
            <label>Current Slide</label>
            <span>
                {currentSlideIndex + 1} / {slides?.length}
            </span>
        </div>
    );
}

/** Shows delta of the starting of the presentation */
function Timer(props: React.HTMLAttributes<HTMLDivElement>) {
    const { started } = usePresentation();

    // Calculate the time delta
    const [delta, setDelta] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    useEffect(() => {
        if (!started) return;
        const timer = setInterval(() => {
            const delta = new Date().getTime() - started.getTime();
            setDelta({
                hours: Math.floor(delta / 1000 / 60 / 60),
                minutes: Math.floor(delta / 1000 / 60) % 60,
                seconds: Math.floor(delta / 1000) % 60
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [started]);

    return (
        <div {...props}>
            <label>Timer</label>
            <span>
                {delta.hours.toString().padStart(2, '0')}:
                {delta.minutes.toString().padStart(2, '0')}:
                {delta.seconds.toString().padStart(2, '0')}
            </span>
        </div>
    );
}
