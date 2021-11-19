import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { useHistory, Link } from 'react-router-dom'
import { createProject } from '../../helpers/apiCalls'

import AddProjectDetail from './AddProjectDetail'


const CreateProjectsOwn = () => {

    const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } = useContext(UserContext)
    const [data, setData] = useState({
      title : "",
      authorship: user.name,
      description: "",
    })
    const [ newProject, setNewProject ] = useState()

    const [isNewProject, setIsNewProject] = useState(false)

    const history = useHistory()

    const handleInput = (e) => {
      setData({ 
        ...data, 
        [e.target.name]: e.target.value
      })
 
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          const res = await createProject(data)
          if(res.error){
            console.log(res.error);
            return
          }
          setNewProject(res)
          setOwnProjects([...ownProjects, res])
          setIsNewProject(true)
          setData({
            title : "",
            authorship: user.name,
            description: ""
          })
          
      } catch (error) {
         console.log(error)
      }
    }
   

    const backToProject = () => {
      setNewProject()
      return history.push('/account/project')

    }

    return (
        <div>

          <form className="form" onSubmit={handleSubmit}>
              <label htmlFor="title">Title: </label>
              <input
                id="title"
                name="title"
                type="text"
                value={data.title}
                placeholder="Project Title"
                onChange={handleInput}
              />
             
              <label htmlFor="authorship">Concept: </label>
              <input
                name="authorship"
                type="text"
                id="authorship"
                defaultValue={data.authorship}
                onChange={handleInput}
              />
             
              <textarea
                name="description"
                value={data.description}
                style={{width:"100%"}}
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

          {isNewProject ? (
            <AddProjectDetail 
              newProject={newProject}
            />
          ) : (
            <></>
          )}
        </div>
    )
}

export default CreateProjectsOwn
