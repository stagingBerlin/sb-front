import React, {useState} from 'react'

export default function DeleteButton({
    color,
    fontSize,
    colorHover = color,
    transformScale,
    handleClick, 
    id
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
    // <i class="far fa-trash-alt"></i>

    return (
        <i 
            className="far fa-trash-alt"
            style={style} 
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            id={id}
        />
    )
}
