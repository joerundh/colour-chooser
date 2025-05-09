import convert from "color-convert";
import styles from "./ColorDisplay.module.css";
import { useEffect, useState } from "react";

export default function ColorDisplay({ props }) {
    const { red, green, blue } = props;

    const [ hex, setHex ] = useState(`#${convert.rgb.hex(red, green, blue)}`);

    const hsl = convert.rgb.hsl(red, green, blue);
    const [ hue, setHue ] = useState(hsl[0]);
    const [ saturation, setSaturation ] = useState(hsl[1]);
    const [ lightness, setLightness ] = useState(hsl[2]);
    
    const cmyk = convert.rgb.cmyk(red, green, blue);
    const [ cyan, setCyan ] = useState(cmyk[0]);
    const [ magenta, setMagenta ] = useState(cmyk[1]);
    const [ yellow, setYellow ] = useState(cmyk[2]);
    const [ key, setKey ] = useState(cmyk[3]);

    useEffect(() =>{
        setHex(`#${convert.rgb.hex(red, green, blue)}`);

        const hsl = convert.rgb.hsl(red, green, blue);
        setHue(hsl[0]);
        setSaturation(hsl[1]);
        setLightness(hsl[2]);

        const cmyk = convert.rgb.cmyk(red, green, blue);
        setCyan(cmyk[0]);
        setMagenta(cmyk[1]);
        setYellow(cmyk[2]);
        setKey(cmyk[3]);
    }, [ red, green, blue ])

    return (
        <div className={styles.displayContainer}>
            <div className={styles.colorDisplay} style={{ backgroundColor: hex }}>
                <p className={styles.displayElement}>#{convert.rgb.hex(red, green, blue)}</p>
                <p className={styles.displayElement}>rgb({red}, {green}, {blue})</p>
                <p className={styles.displayElement}>hsl({hue}deg, {saturation}%, {lightness}%)</p>
                <p className={styles.displayElement}>device-cmyk({cyan}%, {magenta}%, {yellow}%, {key}%)</p>
            </div>
            <div className={styles.buttons}>
                <button onClick={() => navigator.clipboard.writeText(hex)}>Copy HEX code</button>
                <button onClick={() => navigator.clipboard.writeText(`rgb(${red}, ${green}, ${blue})`)}>Copy RGB</button>
                <button onClick={() => navigator.clipboard.writeText(`hsl(${hue}deg, ${saturation}%, ${lightness}%)`)}>Copy HSL</button>
                <button onClick={() => navigator.clipboard.writeText(`device-cmyk(${cyan}%, ${magenta}%, ${yellow}%, ${key}%)`)}>Copy CMYK</button>
            </div>
        </div>
    );
}