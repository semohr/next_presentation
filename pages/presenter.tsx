import {
    Controls,
    Info,
    Notes,
    Preview,
    ResizerHorizontal
} from 'components/presenter';

import styles from '@theme/presenter.module.scss';

/** Presenter view
 * @param props
 */
export default function Presenter() {
    return (
        <main className={styles.main}>
            <div className={styles.Overview}>
                <Info className={styles.Info} />
                <Preview className={styles.Preview} />
                <Controls className={styles.Controls} />
            </div>
            <ResizerHorizontal className={styles.ResizerHorizontal} />
            <Notes className={styles.Notes} />
        </main>
    );
}
