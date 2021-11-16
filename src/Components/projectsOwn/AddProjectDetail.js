import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { useHistory} from 'react-router'
import { createProject, updateOwnProject } from '../../helpers/apiCalls'
import SingleSelect from '../userprofileOwn/SingleSelect'
import CreateProjectsOwn from './CreateProjectsOwn'

const AddProjectDetail = ({data, setData, jobId, setJobId, handleInput}) => {

    const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects, isNewProject, setIsNewProject } = useContext(UserContext)

    const [jobName, setJobName] = useState([])
    const [isActive, setIsActive] = useState(true)
    const history = useHistory()

    const toggleChecked = (e) => {
        setIsActive(value => !value)
      }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {

            //! NEEDS FIX TMR
            const res = await updateOwnProject( data._id, 
                {...data} )

            setOwnProjects([...ownProjects, res])
            setTimeout(()=> {
                history.push('/account/project')
               // setIsNewProject(false)
            }, 1600)
            
        } catch (error) {
           console.log(error)
        }
      
      }
    
    const backToProject = () => {
        return history.push('/account/project')
      }
  

    return (
        <>
          <form>
              <label htmlFor="title">Title: </label>
              <input
                id="title"
                name="title"
                type="text"
                onChange={handleInput}
                defaultValue={data.title}
              />
              <label htmlFor="owner">Contact: </label>
              <input
                id="owner"
                name="owner"
                type="text"
                defaultValue={user.username}
                onChange={handleInput}
              />
              <label htmlFor="authorship">Concept: </label>
              <input
                name="authorship"
                type="text"
                id="authorship"
                defaultValue={user.name}
                onChange={handleInput}
              />
             
              <textarea
                name="description"
                type="text"
                defaultValue={data.description}
                onChange={handleInput}
                rows="8" 
                cols="50"
              />
            
              <h2> Project {data.title} is newly created. Add important details to your project below.</h2>

              <label htmlFor="title">Required Roles: </label>
              <SingleSelect
                    id="roles"
                    jobName={jobName} 
                    setJobName={setJobName} 
                    jobs={jobs} 
                    data={data} 
                    setData={setData}
                   
                  />

                <label htmlFor="participants">Participants: </label>
                <input
                    name="participants"
                    type="text"
                    id="participants"
                    onChange={handleInput}
                /><br/>


                <label htmlFor="deadline">Deadline: </label>
                <input
                    name="deadline"
                    type="date"
                    id="deadline"
                    onChange={handleInput}
                />

                <label htmlFor="starting">Starting on: </label>
                <input
                    name="starting"
                    type="date"
                    id="starting"
                    onChange={handleInput}
                />

                <input 
                    type="radio"  
                    name="isHiring"
                    onChange={(e)=>toggleChecked(e)}
                    defaultChecked
                    value=""
                    
                    >
                    </input>
                    <label htmlFor="isHiring">Hiring Now</label>

                    <input 
                    type="radio"  
                    name="isHiring"
                    onChange={(e)=>toggleChecked(e)}
                    value=""
                    >
                    </input>
                    <label htmlFor="isHiring">Not Hiring</label>

                <input type="submit" value="Update" className="button-grid-2fr grid-col-2" onClick={handleSubmit} />
                <input type="button" value="Cancel" className="button-grid-2fr grid-col-2" onClick={backToProject} />
            
          </form>   
        </>
    )
}

export default AddProjectDetail
