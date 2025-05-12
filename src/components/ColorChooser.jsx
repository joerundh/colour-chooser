import { useState, useEffect, createContext } from "react";

import TabManager from "./TabManager.jsx";
import Panel from "./Panel.jsx";

import RGBBoard from "./RGBBoard.jsx";
import HSLBoard from "./HSLBoard.jsx";
import CMYKBoard from "./CMYKBoard.jsx";
import NameBoard from "./NameBoard.jsx";

import ColorDisplay from "./ColorDisplay.jsx";

import styles from "./ColorChooser.module.css";

export const RGBContext = createContext();

export function ColorChooser() {
    const rgb = JSON.parse(localStorage.getItem("color-chooser-stored-rgb") || "[0, 0, 0]");
    const [ red, setRed ] = useState(rgb[0]);
    const [ green, setGreen ] = useState(rgb[1]);
    const [ blue, setBlue ] = useState(rgb[2]);

    const storeRGB = () => {
        localStorage.setItem("color-chooser-stored-rgb", JSON.stringify([ red, green, blue ]));
    }

    useEffect(() => {
        storeRGB();
    }, [ red, blue, green ])

    return (
        <div className={styles.colorChooser}>
            <RGBContext.Provider value={{ red, setRed, green, setGreen, blue, setBlue }}>
                <TabManager>
                    <Panel title="RGB">
                        <RGBBoard />
                    </Panel>
                    <Panel title="HSL">
                        <HSLBoard />
                    </Panel>
                    <Panel title="CMYK">
                        <CMYKBoard />
                    </Panel>
                    <Panel title="Name">
                        <NameBoard />
                    </Panel>
                </TabManager>
            </RGBContext.Provider>
            <ColorDisplay props={{ red, green, blue }} />
        </div>
    );
}