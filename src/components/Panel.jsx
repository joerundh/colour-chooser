import styles from "./Panel.module.css";

export default function Panel({ children }) {
    return (
        <div className={styles.panel}>
            {children}
        </div>
    )
}