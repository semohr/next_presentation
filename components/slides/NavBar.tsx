import { usePresentation } from 'lib/context';

import styles from '@theme/slides.module.scss';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    sections?: boolean;
}

/** Navbar for a slide, shows slide number and current section
 */
export default function NavBar({ sections = true, ...divProps }: Props) {
    const { currentSlideIndex, slides } = usePresentation();
    return (
        <div className={styles.navbar} {...divProps}>
            <Logo className={styles.Logo} />
            {sections ? (
                <SectionProgress className={styles.SectionProgress} />
            ) : null}
            <div className={styles.CurrentSlide}>
                <div className={styles.current}>{currentSlideIndex + 1}</div>
                <div className={styles.total}>{slides.length}</div>
            </div>
        </div>
    );
}

function SectionProgress(props: React.HTMLAttributes<HTMLDivElement>) {
    const { currentSlideIndex, slides } = usePresentation();

    // Count the sections
    let offset = 0;
    const sections_count: Record<string, number> = slides.reduce(function (
        p,
        c
    ) {
        const sec = c.fontMatter.section;
        if (!sec) {
            offset += 1;
            return p;
        }
        if (sec in p) {
            p[sec]++;
        } else {
            p[sec] = 1;
        }
        return p;
    },
    {});

    // For each section construct a progress bar
    const sections_progress = [];

    Object.entries(sections_count).forEach((sec) => {
        const sec_name = sec[0];
        const sec_count = sec[1];
        // convert current index to be relative to the section
        const sec_index = currentSlideIndex - offset;

        //Check for current slide number
        sections_progress.push(
            <ProgressBar
                key={sec_name}
                label={sec_name}
                total={sec_count}
                current={sec_index}
            />
        );

        offset += sec_count;
    });

    return <div {...props}>{sections_progress}</div>;
}

interface PropsProgress extends React.HTMLAttributes<HTMLDivElement> {
    current: number;
    total: number;
    label: string;
}

/** Progress bar with discrete steps
 *  - Steps
 *  - Nodes
 *  - Subnodes
 *          label
 * o---o---o---o----o---o
 */
function ProgressBar({ current, total, label, ...divProps }: PropsProgress) {
    const steps = [];
    for (let i = 0; i < total; i++) {
        let st = styles.step + ' ';
        if (i < current) {
            st += styles._completed;
        } else if (i == current) {
            st += styles._current;
        }

        steps.push(
            <div key={i} className={st}>
                <div className={styles.node} />
            </div>
        );
    }

    return (
        <div
            className={styles.progress}
            style={{ width: total * 100 + '%' }}
            {...divProps}
        >
            <div className={styles.label}>{label}</div>
            <div className={styles.bar}>{steps}</div>
        </div>
    );
}

function Logo({ ...divProps }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={styles.logo} {...divProps}>
            Sebastian B. Mohr
        </div>
    );
}
