import styles from "@themes/default/layouts/titlepage.module.scss";

export const Layouts = {
    // Layouts for slides
    // Layouts are defined in the fontMatter.layoutcan be defined in the mdx header
    // ---
    default: {},
    titlepage: {
        Location: (props) => (
            <div className={styles.Location}>
                <h3 {...props}></h3>
            </div>
        ),
    },
};
