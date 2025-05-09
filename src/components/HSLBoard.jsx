import { useState, useEffect, useContext } from "react";
import ComponentSlider from "./ComponentSlider.jsx";

import convert from "color-convert";

import styles from "./HSLBoard.module.css";

import { RGBContext } from "./ColorChooser.jsx";

export default function HSLBoard() {
    const { red, setRed, green, setGreen, blue, setBlue } = useContext(RGBContext);

    const hsl = convert.rgb.hsl(red, green, blue);
    const [ hue, setHue ] = useState(hsl[0]);
    const [ saturation, setSaturation ] = useState(hsl[1]);
    const [ lightness, setLightness ] = useState(hsl[2]);

    useEffect(() => {
        const rgb = convert.hsl.rgb(hue, saturation, lightness);
        setRed(rgb[0]);
        setGreen(rgb[1]);
        setBlue(rgb[2]);
    }, [ hue, saturation, lightness ]);

    const setValues = hsl => {
        setHue(hsl[0]);
        setSaturation(hsl[1]);
        setLightness(hsl[2]);
    }

    const invert = () => {
        const hsl = convert.rgb.hsl(255 - red, 255 - blue, 255 - green);
        setValues(hsl);
    }

    const toGrayscale = () => {
        const gray = convert.rgb.gray(red, blue, green);
        const hsl = convert.gray.hsl(gray);
        setValues(hsl);
    }

    const setRandomValues = () => {
        const rgb = [ Math.random(), Math.random(), Math.random() ].map(value => Math.floor(256*value));
        const hsl = convert.rgb.hsl(rgb);
        setValues(hsl);
    }

    return (
        <div className={styles.hslBoard}>
            <div className={styles.components}>
                <ComponentSlider label="Hue" value={hue} min={0} max={360} setter={ setHue } />
                <ComponentSlider label="Saturation" value={saturation} min={0} max={100} setter={ setSaturation } />
                <ComponentSlider label="Lightness" value={lightness} min={0} max={100} setter={ setLightness } />
            </div>
            <div className={styles.buttons}>
                <button onClick={() => invert()}>Invert</button>
                <button onClick={() => toGrayscale()}>Grayscale</button>
                <button onClick={() => setRandomValues()}>Randomize</button>
            </div>
        </div>
    );
}