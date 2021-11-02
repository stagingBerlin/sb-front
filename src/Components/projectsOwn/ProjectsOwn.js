import React, {useState, useContext } from 'react'
import { UserContext } from "../../context/UserContext"

function ProjectsOwn() {

       const { user, setUser } = useContext(UserContext)
       
       return (
        <div>
            My Projects
        </div>
    )
}

export default ProjectsOwn
