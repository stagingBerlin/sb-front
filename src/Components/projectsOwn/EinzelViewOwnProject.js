import { getThemeProps } from '@mui/system'
import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'

const EinzelViewOwnProject = (id) => {
    const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } = useContext(UserContext)

    return (
        <div className="grid-container">
            <div className="grid-col-2 grid-col-span-3">
                {ownProjects && ownProjects
                .filter(project => project._id === id.id)
                .map(item=> (
                    <div key={item._id}>
                        <h2>{item.title}</h2>
                        <p>Concept: {item.authorship}</p>
                        <p>Description: {item.description}</p>
                        <p>Roles: {item.jobList.map(role=> {
                            return role.job.title
                        })}</p>
                        <p>Participants: {item.jobList.participant}</p>
                        <p>Deadline: </p>
                        <p>Opening: </p>
                        <p>Location: </p>
                        <p>Contact: {user.username}</p>
                        <p>Project status: {item.isHiring ? 'Active' : 'Inactive'}</p>
                    </div>
                    ))}
                <Link to="/account/project/edit" className="button-grid-2fr grid-col-2">EDIT</Link>
            </div>
        </div>
    )
}

export default EinzelViewOwnProject
