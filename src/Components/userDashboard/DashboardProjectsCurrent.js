import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { UserContext } from '../../context/UserContext'

function DashboardProjectsCurrent() {

    const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } = useContext(UserContext)

    return (
        <div>

            { user.isHiring ? (
                ownProjects && ownProjects.map((project, i)=> (
                    <Link to={`/account/project/${project._id}`}>
                    <h3 key={i} >{project.title} by {project.authorship}</h3>
                    </Link>))
            ) : (  
                user.joinedProject && user.joinedProject.map((project, i)=> (
                    <h3 key={i} >{project.projectTitle} by "handle later"</h3>))
            )}
            
        </div>
    )
}

export default DashboardProjectsCurrent
