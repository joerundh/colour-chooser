import { useState, useEffect, useContext } from "react";
import convert from "color-convert";
import colors from "color-name";

import styles from "./NameBoard.module.css";

import { RGBContext } from "./ColorChooser.jsx";

export default function NameBoard() {
    const { red, setRed, green, setGreen, blue, setBlue } = useContext(RGBContext);

    const getName = (r, g, b) => {
        return Object.keys(colors).filter(name => {
            return colors[name][0] === r && colors[name][1] === g && colors[name][2] === b
        }).at(0) || "";
    }

    const [ name, setName ] = useState(getName(red, green, blue) || "");

    useEffect(() => {
        if (name) {
            setSearchString("");
            const rgb = convert.keyword.rgb(name);
            setRed(rgb[0]);
            setGreen(rgb[1]);
            setBlue(rgb[2]);
        }
    }, [ name ]);

    const [ searchString, setSearchString ] = useState("");
    const [ focused, setFocused ] = useState(false)

    let suggestions = [];

    const getSuggestions = str => {
        return Object.keys(colors)
            .filter(name => name.match(new RegExp(`${str}`, "gi")))
    }

    const [ copied, setCopied ] = useState(false);

    useEffect(() => {
        setCopied(false);
    }, [ name ])

    const [ selected, setSelected ] = useState(-1);

    const handleKeyPress = e => {
        if (e.key === "ArrowDown") {
            if (selected < suggestions.length) {
                setSelected(selected + 1);
            }
        } else if (e.key === "ArrowUp") {
            if (selected >= 0) {
                setSelected(selected - 1);
            }
        }
    }

    const copyToClipBoard = (str) => {
        navigator.clipboard.writeText(str);
    }

    const copyNameToClipBoard = () => {
        copyToClipBoard(name);
        setCopied(true);
    }

    const setRandomName = () => {
        const index = Math.floor(Object.keys(colors).length*Math.random());
        setName(Object.keys(colors)[index]);
    }

    return (
        <div className={styles.nameBoard}>
            <div className={styles.current}>
                {
                    name ? (
                        <>
                            <p>Name:</p>
                            <p className={styles.colorName}>{name}</p>
                            {
                                copied ? (
                                    <p>Name copied to clipboard!</p>
                                ) : (
                                    <button onClick={() => copyNameToClipBoard()}>Copy to clipboard</button>
                                )
                            }
                        </>
                    ) : (
                        <>
                            <p>No exact matches found. Closest match:</p>
                            <p className={styles.colorName}>{convert.rgb.keyword(red, green, blue)}</p>
                            <p style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                                <button onClick={() => setName(convert.rgb.keyword(red, green, blue))}>Set to closest match</button>
                                <button onClick={() => copyToClipBoard(convert.rgb.keyword(red, green, blue))}>Copy to clipboard</button>
                            </p>
                        </>
                    )
                }
            </div>
            <div className={styles.tools}>
                <div className={styles.search}>
                    <div>
                        <span>Search for a name:</span>
                        <input type="text" value={searchString} onChange={e => setSearchString(e.target.value)} onKeyDown={e => handleKeyPress(e)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} />
                    </div>
                    {
                        searchString && focused ? (
                            <div className={styles.suggestions}>
                                <ul>
                                    {
                                        (suggestions = getSuggestions(searchString)).length ? suggestions.map((name, index) => (
                                            <li key={index} className={styles.suggestion} onMouseDown={() => setName(name)}>
                                                <div className={styles.colorBox} style={{ backgroundColor: name }}></div>{name}
                                            </li>
                                        )) : (
                                            <li>No matching names.</li>
                                        )
                                    }
                                </ul>
                            </div>
                        ) : ""
                    }
                </div>
                <div className={styles.select}>
                    <select defaultValue="" onChange={e => setName(e.target.value)}>
                        <option value="" disabled={true}>Select a name:</option>
                        {
                            Object.keys(colors).map((name, index) => (
                                <option key={index} value={name}>
                                    {name}
                                </option>
                            ))
                        }
                    </select>
                    <button onClick={() => setRandomName()}>Randomize</button>
                </div>
            </div>
        </div>
    );
}