import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { useHistory} from 'react-router'
import { createProject } from '../../helpers/apiCalls'
import MultipleSelect from '../userprofileOwn/MultipleSelect'


const CreateProjectsOwn = () => {

    const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } = useContext(UserContext)
    const [data, setData] = useState({
      title : "",
      owner : user.name,
      authorship: user.name,
      description: "",
      roles: [],
      participants: []
    })
    const [isNewProject, setIsNewProject] = useState(false)
    
    const [jobId, setJobId] = useState([])
    const [jobName, setJobName] = useState([])

    const history = useHistory()

    useEffect(() => {
      
        const tempArr = []
        jobName.map(item => {
          const findObj = jobs.find(job => job.title === item)
          tempArr.push(findObj)
        })
        setJobId(tempArr)
      
    }, [jobName])


    const handleInput = (e) => {
      setData({ 
        ...data, 
        [e.target.name]: e.target.value
      })
      console.log(e.target.value);
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          const res = await createProject({...data, roles: jobId})
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
    console.log(isNewProject)
    
    const backToProject = () => {
      return history.push('/account/project')
    }

    return (
        <div>
          {isNewProject ? <h2>New Project has been created!</h2> : (
            <form id="pform" onSubmit={handleSubmit}>
              <label htmlFor="title">Title: </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Project Title"
                onChange={handleInput}
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
                defaultValue={user.name}
                onChange={handleInput}
              />
              <MultipleSelect
                jobName={jobName} 
                setJobName={setJobName} 
                jobId={jobId} 
                setJobId={setJobId}
                jobs={jobs} 
                setJobs={setJobs}
                user={user}
              />
              <textarea
                name="description"
                type="text"
                form="pform"
                onChange={handleInput}
                placeholder="Project description..."
                rows="8" 
                cols="50"
              />
            
            <input type="submit" value="Create" className="button-grid-2fr grid-col-2" onClick={handleSubmit} />
            <input type="button" value="Cancel" className="button-grid-2fr grid-col-2" onClick={backToProject} />
          </form>
          )}
          
        </div>
    )
}

export default CreateProjectsOwn
