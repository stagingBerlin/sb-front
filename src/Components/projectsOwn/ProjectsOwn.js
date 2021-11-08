import React, { useState, useContext, useEffect} from 'react'
import { useHistory  } from 'react-router'
import {NavLink} from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const ProjectsOwn = () => {
    const { user, setUser } = useContext(UserContext)
    return (
        <>
         <h2>My Projects</h2>
         {user.ownedProject.length ? user.ownedProject : `No projects found.`}
         <NavLink to="/account/createProject"> Create a project</NavLink>
        </>
    )
}

export default ProjectsOwn

