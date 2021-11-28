import React, { useState } from 'react'

export default function AddJobButton({
    color,
    fontSize,
    colorHover = color,
    transformScale,
    handleClick, 
}) {

    const [ fontColor, setFontColor ] = useState(color)
    const [scale, setScale] = useState()

    const styleContainer = {

        cursor: 'pointer',
        borderRadius: ".5rem",
        border: `2px solid ${fontColor}`,
        transform: scale,
        transition: `0.5s`,
        padding:  "1rem",
        color: fontColor,
        textAlign: "center",
        width: "16rem",
        height: "7rem",
        display:"flex",
        justifyContent: "space-between",
        alignItems: "center",
        letterSpacing: "0.04rem"
    }

    const styleIcon = {
        fontSize: `${fontSize}rem`
    }

    const styleHeading = {
        // marginRight: ".9rem",
    }

    const handleMouseEnter = () => {
        setFontColor(colorHover)
        setScale(`scale(${transformScale})`)
    }

    const handleMouseLeave = () => {
        setFontColor(color)
        setScale()
    }


    return (
        <div
            style={styleContainer}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
        <h1
            style={styleHeading}
        >Add a Job</h1>
            <i 
                className="fas fa-plus"
                style={styleIcon}   

            />
        </div>
    )
}
