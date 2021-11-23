import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'

const EinzelProjectOther = (id) => {
    const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } = useContext(UserContext)

    return (
        <div className="grid-container">
            <div className="grid-col-2 grid-col-span-3">
           
            </div>
        </div>
    )
}

export default EinzelProjectOther
