import { useEffect, useState } from 'react';

import styles from '@theme/slides.module.scss';

/** Viewer for the snap fotos
 *  - registers [j] and [k] key for navigation
 */
export const SnapExample = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const keyListener = (e: KeyboardEvent) => {
            if (e.key === 'j') {
                if (index === 0) {
                    return;
                }
                setIndex(index - 1);
            } else if (e.key === 'k') {
                if (index === 8) {
                    return;
                }
                setIndex(index + 1);
            }
        };
        window.addEventListener('keydown', keyListener);
        return () => window.removeEventListener('keydown', keyListener);
    }, [index]);

    const n_pics = 8;

    let ret = <></>;
    for (let i = 1; i < n_pics + 1; i++) {
        if (i <= index) {
            ret = (
                <>
                    {ret}
                    <div
                        style={{
                            position: 'absolute',
                            left: 40 * (i - 1),
                            top: 75 * (i - 1),
                            filter: index === i ? 'blur(0)' : 'blur(5px)'
                        }}
                    >
                        <img src={`snap_${i}.png`} />
                    </div>
                </>
            );
        }
    }
    return (
        <div className={styles.snap}>
            <div>{ret}</div>
        </div>
    );
};
