import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { getProjects } from '../../helpers/apiCalls'
import { Link } from "react-router-dom";

function ShowProjects() {
    const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } = useContext(UserContext)
    const [projects, setProjects] = useState([])
    const [isMyRole, setIsMyRole] = useState(false)
    console.log(isMyRole);
    console.log(user.profession)
    const filtered = user.profession.map(role => role.title)
    console.log(filtered);
    useEffect(() => {
        const allProjects = async () => {
            try {
                const res = await getProjects();

                if(!res.error){
                    setProjects(res)
                    return;
                }

            } catch (error) {
                console.log(error);
            };
        };
        allProjects()
    }, [])

    function filterByRole(){
      setIsMyRole(!isMyRole)
      if (isMyRole) {
         const filteredProject = projects.filter(project => {
              return project.jobList.title === filtered
          })
          console.log(filteredProject)
      }
    }
    

    return (
        <div>
            <h1>All Projects</h1>
            <label htmlFor="isMyRole">Filter projects containing my role(s)</label>
            <input 
            type="checkbox" 
            name="isMyRole"
            checked={isMyRole}
            onChange={filterByRole}
             />
           
            {projects.map(project=> (
                <Link to="/account/search"><h3>{project.title} by {project.authorship}</h3></Link>
            ))}

    
        </div>
    )
}

export default ShowProjects
