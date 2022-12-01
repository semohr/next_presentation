import { usePresentation } from 'lib/context';
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';

import styles from '@theme/slides.module.scss';

/** Allows you to change change the current
 * presentation slide form the slides view
 */
export function SlideControl() {
    const { setNextSlide, setPreviousSlide, currentSlideIndex, slides } =
        usePresentation();

    return (
        <div className={styles.SlideControl}>
            {currentSlideIndex > 0 ? (
                <button className={styles.prev} onClick={setPreviousSlide}>
                    <BsChevronCompactLeft />
                </button>
            ) : (
                <div></div>
            )}
            {currentSlideIndex < slides.length - 1 ? (
                <button className={styles.next} onClick={setNextSlide}>
                    <BsChevronCompactRight />
                </button>
            ) : (
                <div></div>
            )}
        </div>
    );
}
