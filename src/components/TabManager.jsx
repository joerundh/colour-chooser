import { useState, useEffect } from "react";
import styles from "./TabManager.module.css";

export default function TabManager({ children }) {
    const lastViewed = JSON.parse(localStorage.getItem("color-chooser-last-viewed-tab") || "0");
    const [ viewing, setViewing ] = useState(lastViewed);

    const storeViewedTab = () => {
        localStorage.setItem("color-chooser-last-viewed-tab", JSON.stringify(viewing));
    }

    useEffect(() => {
        storeViewedTab();
    }, [ viewing ])

    return (
        <>
            <div className={styles.tabManager}>
                <div className={styles.tabsBar}>{
                    children.map((child, index) => {
                        const classNames = [ styles.tab ];
                        if (index === viewing) {
                            classNames.push(styles.active);
                        } else {
                            classNames.push(styles.inactive);
                        }
                        
                        return (
                            <div key={index} className={classNames.join(" ")} onClick={() => setViewing(index)}>
                                <p>{child.props.title}</p>
                            </div>
                        )
                    })
                }</div>
                {children[viewing]}
            </div>
        </>
    )
}