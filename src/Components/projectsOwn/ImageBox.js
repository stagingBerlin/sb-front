import React, { useState } from 'react'

export default function ImageBox({image, handleClick }) {

    return (
        <div 
            id={image}
            className="card__picture--1"
            style={
                {backgroundImage: `url(${image})`}
            }
            onClick={handleClick}
            ></div>
    )
}
