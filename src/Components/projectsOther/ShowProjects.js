import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { getProjects } from '../../helpers/apiCalls'
import { Link } from "react-router-dom";
import { flexbox, width } from '@mui/system';

function ShowProjects() {
    const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } = useContext(UserContext)
    const [viewProject, setViewProject] = useState([])
    const [projects, setProjects] = useState([])
    const [isMyRole, setIsMyRole] = useState(false)
    const [isNewest, setIsNewest] = useState(false)

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

    console.log(isNewest)
    useEffect(() => {
        if (isNewest) {
         
            const newest = projects.sort((x,y)=> +new Date(y.createdAt) - +new Date(x.createdAt))
      
            console.log(newest)
            setViewProject(newest)
            
        } else {
            setViewProject(projects)
        }
    }, [isNewest])

    function filterByRole(){
      setIsMyRole(!isMyRole)
    }

    function sortNewest() {
        setIsNewest(!isNewest)
    }
    

    return (
            <div className="grid-container">
                <div className="grid-col-2 grid-col-span-4">
                    <h1>All Projects</h1>
                    <div>
                    <label htmlFor="isMyRole">Show projects containing my role(s) only</label>
                    <input 
                    type="checkbox" 
                    name="isMyRole"
                    checked={isMyRole}
                    onChange={filterByRole}
                    />
            
                    <label htmlFor="newest">Newest Project First</label>
                    <input 
                    type="checkbox" 
                    name="isNewest"
                    checked={isNewest}
                    onChange={sortNewest}
                     />
                </div>
                {viewProject.map((project, i)=> (
                    <div style={{flexWrap: 'wrap', width: '100%'}}>
                        <Link to="/account/search" key={i} >
                            <h3>{project.title} by {project.authorship}</h3>
                            <img src={project.images[0]} width="20%" ></img>
                        </Link>
                    </div>
                ))}
                </div>
            </div>     
            )
           
}

export default ShowProjects
