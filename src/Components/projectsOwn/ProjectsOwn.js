import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'

const ProjectsOwn = () => {
    const { ownProjects } = useContext(UserContext)
    
    return (
        <div className="grid-container">
            <div className="grid-col-2 grid-col-span-3">
              <h2>My Projects</h2>
                {ownProjects && ownProjects.length !== 0 ? (
                    ownProjects.map((project, i)=> (
                    <div key={i}>
                        <Link to={`/account/project/${project._id}`}>
                            <p>{project.title} by {project.authorship}</p>
                        </Link>
                    </div>))
                ) : (
                    <h3>No projects found.</h3>
                )       
                }
              <Link to="/account/createProject" className="button-grid-2fr grid-col-2"> Create a project</Link>
           </div>
        </div>
    )
}

export default ProjectsOwn

