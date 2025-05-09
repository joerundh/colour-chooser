import { useState } from "react";
import styles from "./ComponentSlider.module.css";

export default function ComponentSlider({ label, value, min, max, setter }) {
    const setValue = target => {
        const val = target.value;
        const newValue = (Number.isNaN(val) || val === "") ? min : Number.parseInt(val);
        if (newValue < min) {
            setter(min);
            target.svalue = min;
        } else if (newValue > max) {
            setter(max);
            target.value = max;
        } else {
            setter(newValue);
            target.value = newValue;
        }

    }

    const handleKeyPress = e => {
        if (e.key === "Enter") {
            e.target.blur();
        }
    }

    return (
        <div className={styles.componentSlider}>
            <p>{label}:</p>
            <input type="range" value={value} min={min} max={max} step={1} onChange={e => setter(e.target.value)} />
            <input type="text" value={value} onChange={e => setValue(e.target)} onKeyDown={e => handleKeyPress(e)}/>
        </div>
    )
}