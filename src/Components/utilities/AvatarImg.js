import React from 'react'

export default function AvatarImg({
    large, 
    image,
}) {

    const stylePicture = {
        width: `${large}rem`,
        height: `${large}rem`,
        backgroundImage: `url(${image})`,
        backgroundRepeat:"no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "50%",
        border : "1.5px solid white" 
    }

    

    return (
        
        <div
            style={stylePicture}
        ></div>
        
    )
}
