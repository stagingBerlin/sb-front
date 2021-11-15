import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { useHistory} from 'react-router'
import { createProject, updateOwnProject } from '../../helpers/apiCalls'
import MultipleSelect from '../userprofileOwn/MultipleSelect'
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
        const jobId = jobs.filter( job => {
            return jobName.includes(job.title)
          }).map(item => item._id)


        try {
            const res = await updateOwnProject( data._id, {...data, profession: jobId})
            setOwnProjects([...ownProjects, res])
            setIsNewProject(true)
  
            setTimeout(()=> {
            setIsNewProject(false)
            history.push('/account/project')}
            , 1600)
            
        } catch (error) {
           console.log(error)
        }
      }
    
    const backToProject = () => {
        return history.push('/account/dashboard')
      }
  

    return (
        <>
          <form>
              <label htmlFor="title">Title: </label>
              <input
                id="title"
                name="title"
                type="text"
                //placeholder="Project Title"
                value={data.title}
                //onChange={handleInput}
              />
              <label htmlFor="owner">Contact: </label>
              <input
                id="owner"
                name="owner"
                type="text"
                value={user.username}
                disabled
              />
              <label htmlFor="authorship">Concept: </label>
              <input
                name="authorship"
                type="text"
                id="authorship"
                value={user.name}
                //onChange={handleInput}
              />
             
              <textarea
                name="description"
                type="text"
                value={data.description}
                //onChange={handleInput}
                //placeholder="Project description..."
                rows="8" 
                cols="50"
              />
            
              <h2> Project {data.title} is newly created. Please add important details to your project below.</h2>

              <label htmlFor="title">Required Roles: </label>
              <MultipleSelect
                    id="roles"
                    jobName={jobName} 
                    setJobName={setJobName} 
                    jobs={jobs} 
                  />
               <textarea
                name="jobDescription"
                type="text"
                onChange={handleInput}
                placeholder="Please provide a detailed job description..."
                rows="2" 
                cols="50"
              /><br/>

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
                    <label htmlFor="ishiring">Hiring Now</label>

                    <input 
                    type="radio"  
                    name="isHiring"
                    onChange={(e)=>toggleChecked(e)}
                    value=""
                    >
                    </input>
                    <label htmlFor="ishiring">Not Hiring</label>

                <input type="submit" value="Update" className="button-grid-2fr grid-col-2" onClick={handleSubmit} />
                <input type="button" value="Cancel" className="button-grid-2fr grid-col-2" onClick={backToProject} />
            
          </form>   
        </>
    )
}

export default AddProjectDetail
