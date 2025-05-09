import { useContext, useEffect } from "react";
import ComponentSlider from "./ComponentSlider.jsx";
import styles from "./RGBBoard.module.css";

import convert from "color-convert";

import { RGBContext } from "./ColorChooser.jsx";

export default function RGBBoard() {
    const { red, setRed, green, setGreen, blue, setBlue } = useContext(RGBContext);

    const setValues = rgb => {
        setRed(rgb[0]);
        setGreen(rgb[1]);
        setBlue(rgb[2]);
    }

    const invert = () => {
        setValues([ 255 - red, 255 - green, 255 - blue ]);
    }

    const toGrayscale = () => {
        const gray = convert.rgb.gray(red, blue, green);
        const rgb = convert.gray.rgb(gray);
        setValues(rgb);
    }

    const setRandomValues = () => {
        const rgb = [ Math.random(), Math.random(), Math.random() ].map(value => Math.floor(256*value));
        setValues(rgb);
    }

    return (
        <div className={styles.rgbBoard}>
            <div className={styles.components}>
                <ComponentSlider label="Red" value={red} min={0} max={255} setter={ setRed } />
                <ComponentSlider label="Green" value={green} min={0} max={255} setter={ setGreen } />
                <ComponentSlider label="Blue" value={blue} min={0} max={255} setter={ setBlue } />
            </div>
            <div className={styles.buttons}>
                <button onClick={() => invert()}>Invert</button>
                <button onClick={() => toGrayscale()}>Grayscale</button>
                <button onClick={() => setRandomValues()}>Randomize</button>
            </div>
        </div>
    );
}