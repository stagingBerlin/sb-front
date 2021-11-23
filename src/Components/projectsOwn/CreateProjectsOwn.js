import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { useHistory, Link } from 'react-router-dom'
import { createProject } from '../../helpers/apiCalls'

import AddProjectDetail from './AddProjectDetail'
import ProjectView from './ProjectView'



const CreateProjectsOwn = () => {

    const { ownProjects, setOwnProjects } = useContext(UserContext)
    const [data, setData] = useState({
      title : "",
      authorship: "",
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
            authorship: "",
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
      // pages styles
      <div className="create-project-page">
        <div className="create-project-page__form">

          {/* components styles create-project-form */}
          <div className="create-project-form">

            {
              !isNewProject ? 
            <form className="create-project-form__project" onSubmit={handleSubmit}>
                <div className="create-project-form__group"> 
                  <input
                    id="title"
                    name="title"
                    className="create-project-form__input"
                    type="text"
                    // value={data.title}
                    placeholder="Title"
                    onChange={handleInput}
                  />
                  <label 
                    htmlFor="title"
                    className="create-project-form__label"
                  >Title</label>
                  
                </div>

                <div className="create-project-form__group">
                  <input
                    id="authorship"
                    name="authorship"
                    placeholder="Concept"
                    className="create-project-form__input"
                    type="text"
                    // defaultValue={data.authorship}
                    onChange={handleInput}
                  />
                  <label 
                    htmlFor="authorship" 
                    className="create-project-form__label"
                  >Concept</label>
                </div>
              
                <div className="create-project-form__group">
                  <textarea
                    id="description"
                    name="description"
                    className="create-project-form__input"
                    value={data.description}
                    style={{width:"100%"}}
                    type="text"
                    form="pform"
                    onChange={handleInput}
                    placeholder="Project description..."
                    rows="8" 
                    cols="50"
                  />
                  <label 
                    htmlFor="description"
                    className="create-project-form__label"
                  >Project description...</label>
                </div>

              <div className="create-project-form__buttons-container">
                <input type="button" value="Cancel" className="button-primary" onClick={backToProject} />
                <input type="submit" value="Create" className="button-primary" onClick={handleSubmit} />
              </div>
            </form>
            : <></>
            }

            {isNewProject ? (
              <AddProjectDetail 
                newProject={newProject}
                setNewProject={setNewProject}
              />
            ) : (
              <></>
            )}
          </div>

        </div>

        <div className="create-project-page__view">
          <ProjectView 
            newProject={newProject}
            setNewProject={setNewProject}
          />
        </div>
      </div>
    )
}

export default CreateProjectsOwn
