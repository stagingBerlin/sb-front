import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { getProjects } from '../../helpers/apiCalls'
import { Link } from "react-router-dom";

function ShowProjects() {
    const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } = useContext(UserContext)
    const [viewProject, setViewProject] = useState([])
    const [projects, setProjects] = useState([])
    const [isMyRole, setIsMyRole] = useState(false)
    
    useEffect(() => {
        const allProjects = async () => {
       
            try {
                const res = await getProjects();

                if(!res.error){
                    setProjects(res)
                    setViewProject(res)
                    return;
                }

            } catch (error) {
                console.log(error);
            };
        };
        allProjects()
    },[])

    const myRole = user.profession.map(role => role.title)

    useEffect(() => {
        if (isMyRole) {
         
            const filtered = projects.filter(list => {

               for (const item of list.jobList) {
                   return myRole.includes(item.job.title)
          }
      
        })
            console.log(filtered)
            setViewProject(filtered)
            
        } else {
            setViewProject(projects)
        }
    }, [isMyRole])

    function filterByRole(){
      setIsMyRole(!isMyRole)
    }

    function sortUrgent() {
        
    }
    

    return (
        <div>
            <h1>All Projects</h1>
            <label htmlFor="isMyRole">Show projects containing my role(s) only</label>
            <input 
            type="checkbox" 
            name="isMyRole"
            checked={isMyRole}
            onChange={filterByRole}
             />
           
            {viewProject.map((project, i)=> (
                <Link to="/account/search" key={i} ><h3>{project.title} by {project.authorship}</h3></Link>
            ))}

    
        </div>
    )
}

export default ShowProjects
