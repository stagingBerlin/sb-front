import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link, useLocation } from 'react-router-dom'

const EinzelProjectOther = (id) => {
    const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } = useContext(UserContext)
    const location = useLocation()
    const viewProject = location.state?.viewProject
    console.log(viewProject)
    return (
        <div className="grid-container">
            <div className="grid-col-2 grid-col-span-4">
           {viewProject}
            </div>
        </div>
    )
}

export default EinzelProjectOther
