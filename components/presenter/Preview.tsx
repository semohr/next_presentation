import { usePresentation } from 'lib/context';
import styles from '@theme/presenter.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import useResizeObserver from '@react-hook/resize-observer';
/** This shows the current and next slide
 * in the presenter view. Depending on the parents
 * size, it will show the current slide in full width
 * and the next slide tries to fill the remaining space
 */
export default function Preview(props: React.HTMLAttributes<HTMLDivElement>) {
    const { screen } = usePresentation();
    const aspectRatio = screen.width / screen.height;
    const container = useRef<HTMLDivElement>(null);

    const [scale_current, setScale_current] = useState(1);
    const [scale_next, setScale_next] = useState(1);

    const update_size = useCallback(() => {
        if (container.current) {
            // Get height/width of container

            const height = container.current.clientHeight - 16; // 16px border
            const width = container.current.clientWidth;

            // Fit current slide to container
            const aR = screen.width / screen.height;

            const v_scale_curr = height / screen.height;
            const h_scale_curr = width / screen.width;
            const scale = Math.min(v_scale_curr, h_scale_curr);
            setScale_current(scale);

            // Fit next slide to container
            const v_scale_next =
                (height - screen.height * scale) / screen.height;
            const h_scale_next = width / screen.width;
            const scale_next = Math.min(v_scale_next, h_scale_next);
            setScale_next(scale_next);
        }
    }, [container, screen]);

    useEffect(() => {
        update_size();
    }, [update_size]);

    useResizeObserver(container, (entry) => {
        update_size();
    });

    return (
        <div {...props} ref={container}>
            <div className={styles.current}>
                <div
                    style={{
                        height: screen.height * scale_current + 'px',
                        width: screen.width * scale_current + 'px'
                    }}
                >
                    <iframe
                        src="/?preview=true"
                        frameBorder="0"
                        style={{
                            transformOrigin: '0 0',
                            transform: `scale(${scale_current})`,
                            height: screen.height + 'px',
                            width: screen.width + 'px',
                            overflow: 'hidden'
                        }}
                    />
                </div>
            </div>
            <div className={styles.next}>
                <div
                    style={{
                        height: screen.height * scale_next + 'px',
                        width: screen.width * scale_next + 'px'
                    }}
                >
                    <iframe
                        src="/?preview=true&next=true"
                        frameBorder="0"
                        style={{
                            transformOrigin: 'top left',
                            transform: `scale(${scale_next})`,
                            height: screen.height + 'px',
                            width: screen.width + 'px',
                            overflow: 'hidden'
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
