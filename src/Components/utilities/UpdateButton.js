import React, { useState } from 'react'

export default function UpdateButton({
    color,
    fontSize,
    colorHover = color,
    transformScale,
    handleClick, 
}) {

    const [ fontColor, setFontColor ] = useState(color)
    const [scale, setScale] = useState()
    

    const style = {
        cursor: 'pointer',
        color: fontColor,
        fontSize: `${fontSize}rem`,
        transform: scale,
        transition: `0.5s`,
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
        <i 
            className="far fa-edit"
            style={style} 
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        />
    )
}
