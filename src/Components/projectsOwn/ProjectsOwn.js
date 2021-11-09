import React, { useState, useContext, useEffect} from 'react'
import { useHistory  } from 'react-router'
import { NavLink } from 'react-router-dom'
//import { fetchUser } from '../../helpers/apiCalls'
//import { getOwnProject } from '../../helpers/apiCalls'
import { UserContext } from '../../context/UserContext'

const ProjectsOwn = () => {
    const { user, setUser } = useContext(UserContext)
    const data = user._id
   

    return (
        <div className="grid-container">
            <div className="grid-col-2 grid-col-span-3">
              <h2>My Projects</h2>
                {!user.ownedProject ? 
                (`No projects found.`
                ) : (
                user.ownedProject.map((project, i)=> (
                    <h3 key={i} >{project.title} by {project.authorship}</h3>
                    )))}
              <NavLink to="/account/createProject" className="button-grid-2fr grid-col-2"> Create a project</NavLink>
           </div>
        </div>
    )
}

export default ProjectsOwn

