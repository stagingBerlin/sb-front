import React, { useState } from 'react'

export default function AddButton({
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
        borderRadius: "1rem",
        border: `2px solid ${fontColor}`,
        transform: scale,
        transition: `0.5s`,
        padding:  "1.5rem",
        color: fontColor,
    }

    const styleIcon = {
        fontSize: `${fontSize}rem`
    }

    const styleHeading = {
        marginTop: ".9rem",
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
        <div style={styleContainer}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <i 
                className="fas fa-user-plus"
                style={styleIcon}   
            />
            <h1 
            style={styleHeading}>Add Participant</h1>
        </div>
    )
}
