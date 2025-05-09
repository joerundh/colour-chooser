import { useState, useEffect, useContext } from "react";
import ComponentSlider from "./ComponentSlider.jsx";

import convert from "color-convert";

import styles from "./CMYKBoard.module.css";

import { RGBContext } from "./ColorChooser.jsx";

export default function CMYKBoard() {
    const { red, setRed, green, setGreen, blue, setBlue } = useContext(RGBContext);

    const cmyk = convert.rgb.cmyk(red, green, blue);
    const [ cyan, setCyan ] = useState(cmyk[0]);
    const [ magenta, setMagenta ] = useState(cmyk[1]);
    const [ yellow, setYellow ] = useState(cmyk[2]);
    const [ key, setKey ] = useState(cmyk[3]);

    useEffect(() => {
        const rgb = convert.cmyk.rgb(cyan, magenta, yellow, key);
        setRed(rgb[0]);
        setGreen(rgb[1]);
        setBlue(rgb[2]);
    }, [ cyan, magenta, yellow, key ]);

    const setValues = cmyk => {
        setCyan(cmyk[0]);
        setMagenta(cmyk[1]);
        setYellow(cmyk[2]);
        setKey(cmyk[3]);
    }

    const invert = () => {
        const cmyk = convert.rgb.cmyk(255 - red, 255 - blue, 255 - green);
        setValues(cmyk);
    }

    const toGrayscale = () => {
        const gray = convert.rgb.gray(red, blue, green);
        const cmyk = convert.gray.cmyk(gray);
        setValues(cmyk);
    }

    const setRandomValues = () => {
        const rgb = [ Math.random(), Math.random(), Math.random() ].map(value => Math.floor(256*value));
        const cmyk = convert.rgb.cmyk(rgb);
        setValues(cmyk);
    }

    return (
        <div className={styles.cmykBoard}>
            <div className={styles.components}>
                <ComponentSlider label="Cyan" value={cyan} min={0} max={100} setter={ setCyan } />
                <ComponentSlider label="Magenta" value={magenta} min={0} max={100} setter={ setMagenta } />
                <ComponentSlider label="Yellow" value={yellow} min={0} max={100} setter={ setYellow } />
                <ComponentSlider label="Key" value={key} min={0} max={100} setter={ setKey } />
            </div>
            <div className={styles.buttons}>
                <button onClick={() => invert()}>Invert</button>
                <button onClick={() => toGrayscale()}>Grayscale</button>
                <button onClick={() => setRandomValues()}>Randomize</button>
            </div>
        </div>
    );
}