import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import DeleteButton from '../utilities/DeleteButton'
import { deleteOwnProject } from '../../helpers/apiCalls'

const ProjectsOwn = () => {
    const { ownProjects, setOwnProjects, projects, setProjects, viewProject, setViewProject } = useContext(UserContext)

    const handleDeleteProject = async (e) =>{
        const id = e.target.id
        const resApi = await deleteOwnProject(id)
        if(resApi.error){
            console.log(resApi.error);
            return
        }

        const deletedItem1 = ownProjects.filter(item =>
            item._id !== id)
        
            
        const deletedItem2 = projects.filter(item =>
            item._id !== id)
                
                
        const deletedItem3 = viewProject.filter(item =>
            item._id !== id)
                    
        setOwnProjects(deletedItem1)
        setProjects(deletedItem2)
        setViewProject(deletedItem3)
    }
    
    return (
        <div className="ownProjects-page">
            <div className="ownProjects">
                <h1 className="ownProjects__heading">My Projects</h1>
                <div className="ownProjects__create-project">
                    <Link to="/account/createProject"  className="btn btn__create">Create Project</Link>
                </div>

                <div className="ownProjects__item-box">
                    {
                        ownProjects.map(item => {
                            return(
                            <div key={item._id} className="ownProjects__item">
                                <div className="ownProjects__info">
                                    <Link to={`/account/project/${item._id}`} className="ownProjects__link">
                                        <h1 className="ownProjects__link--heading">{item.title}</h1>
                                    </Link>
                                    <div className="ownProjects__date">
                                        <p>Deadline:&nbsp;&nbsp;&nbsp;<span className="ownProjects__date--deadline">{item.deadline?.substr(0, 10)}</span></p> 
                                        <p>Starting:&nbsp;&nbsp;&nbsp;<span className="ownProjects__date--starting">{item.starting?.substr(0, 10)}</span></p> 
                                    </div>
                                </div>
                                <div className="ownProjects__trash">
                                    <DeleteButton
                                        id={item._id}
                                        fontSize="2.5" 
                                        transformScale="1.2"
                                        color="#93291e" 
                                        colorHover="#ed213a"
                                        handleClick={handleDeleteProject}
                                    />
                                </div>
                            </div>
                            )
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default ProjectsOwn

