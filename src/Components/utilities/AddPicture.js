import React, { useState, useContext } from 'react'
import { updateOwnProject } from '../../helpers/apiCalls'
import {UserContext} from '../../context/UserContext'

export default function AddPicture({
    color,
    fontSize,
    colorHover = color,
    transformScale,
    handleClick,
    id,
    setNewProject
}) {

    const { setViewProject, viewProject, projects, setProjects, ownProjects, setOwnProjects} = useContext(UserContext)
    

    const [ fontColor, setFontColor ] = useState(color)
    const [ scale, setScale ] = useState()
    // const [ imgPreview, setImgPreview ] = useState("")
    
    const style = {
        cursor: 'pointer',
        color: fontColor,
        fontSize: `${fontSize}rem`,
        transform: scale,
        transition: `0.5s`,
    }

    const inputStyle = {
        display: "none"
    }

    const handleMouseEnter = () => {
        setFontColor(colorHover)
        setScale(`scale(${transformScale})`)
    }

    const handleMouseLeave = () => {
        setFontColor(color)
        setScale()
    }

    const uploadImg = (e) => {
        let fileSelected = e.target.files[0];

        if (!fileSelected) return;

        let fileReader = new FileReader();
        fileReader.readAsDataURL(fileSelected);

        fileReader.onloadend = async (ev) => {
            const newImage = await updateOwnProject(id, {image: fileReader.result})
            setNewProject(newImage)
            const updated = viewProject.map(item => {
                return item._id === newImage._id ?
                newImage
                :
                item
            })

            const updated2 = projects.map(item => {
                return item._id === newImage._id ?
                newImage
                :
                item
            })

            const updated3 = ownProjects.map(item => {
                return item._id === newImage._id ?
                newImage
                :
                item
            })
            setViewProject(updated)
            setProjects(updated2)
            setOwnProjects(updated3)
        };
    }


    return (
        <>
            <label htmlFor="addPicture">
                <i
                    className="far fa-images"
                    style={style} 
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
            </label>
            <input 
                type="file" 
                id="addPicture"
                name="addPicture"
                accept="image/*"
                style={inputStyle}
                onChange={(e) => uploadImg(e)}
            />
        </>
            
        
    )
}
