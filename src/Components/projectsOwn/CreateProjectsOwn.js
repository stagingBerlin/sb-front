import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { useHistory, Link } from 'react-router-dom'
import { createProject } from '../../helpers/apiCalls'

import AddProjectDetail from './AddProjectDetail'


const CreateProjectsOwn = () => {

    const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } = useContext(UserContext)
    const [data, setData] = useState({
      title : "",
      owner : user.username,
      authorship: user.name,
      description: "",
    })
    const [isNewProject, setIsNewProject] = useState(false)

    const [jobName, setJobName] = useState([])

    const history = useHistory()

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
          const res = await createProject({data
          })
          setOwnProjects([...ownProjects, res])
          setIsNewProject(true)
          setData(res)
          
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
          {isNewProject ? (
            <AddProjectDetail 
              data={data}
              setData={setData}
              jobName={jobName}
              setJobName={setJobName}
              isNewProject={isNewProject}
              setIsNewProject={setIsNewProject}
              handleInput={handleInput}

            />
          ) : (
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
             
              <textarea
                name="description"
                type="text"
                form="pform"
                onChange={handleInput}
                placeholder="Project description..."
                rows="8" 
                cols="50"
              />
            
            <Link to='/account/project/edit'> 
              <input type="submit" value="Create" className="button-grid-2fr grid-col-2" onClick={handleSubmit} />
            </Link> 
            <input type="button" value="Cancel" className="button-grid-2fr grid-col-2" onClick={backToProject} />
          </form>
          )}
          
        </div>
    )
}

export default CreateProjectsOwn
