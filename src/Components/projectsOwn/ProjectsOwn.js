import React, { useState, useContext, useEffect} from 'react'
import { useHistory  } from 'react-router'
import {NavLink} from 'react-router-dom'

//import { getOwnProject } from '../../helpers/apiCalls'
import { UserContext } from '../../context/UserContext'

const ProjectsOwn = () => {
    const { user, setUser } = useContext(UserContext)

    return (
        <>
         <h2>My Projects</h2>
         {user.ownedProject ? user.ownedProject.map((project, i)=> (
             <h3>{project.title}</h3>))
            : `No projects found.`}
         <NavLink to="/account/createProject" className="button-grid-2fr grid-col-2"> Create a project</NavLink>
        </>
    )
}

export default ProjectsOwn

