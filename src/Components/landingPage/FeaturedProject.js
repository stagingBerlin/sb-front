import React from 'react'

function FeaturedProject({content}) {
    return (
        <div className="" style={{
            height: '100%',
            width: '100%',
            backgroundImage: `url(${content})`,
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            backgroundPosition:"center"
          }}>
        </div>
    )
}

export default FeaturedProject
