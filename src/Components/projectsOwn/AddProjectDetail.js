import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { addJobToList } from '../../helpers/apiCallsAddJob'

const AddProjectDetail = ({
  newProject,
  setNewProject,
  setShowCreteJob
}) => {

 
  const { jobs, projects, setProjects, viewProject, setViewProject } = useContext(UserContext)
  
    const [inputJob, setInputJob] = useState('');

    const [ addJob, setAddJob ] = useState({
      jobDescription: ""
    })

    const handleChangeJob = (e) => {
      setInputJob(e.target.value);
    };

    const handleChangeDescription  = (e) => {
      setAddJob({ 
        ...addJob, 
        [e.target.name]: e.target.value
      })
    }
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          const myBody = {
            ...addJob,
            job: inputJob
          }

          const resApi = await addJobToList(newProject._id, myBody)
          
          if(!resApi.error){
            setNewProject(resApi)
            setAddJob({
              jobDescription : ""
            })
            setInputJob("")
            setShowCreteJob(false)


            const updated = projects.map(item => 
              item._id === resApi._id ?
              resApi
              :
              item)
          
            const updated2 = viewProject.map(item => 
              item._id === resApi._id ?
              resApi
              :
              item)
              setProjects(updated)
              setViewProject(updated2)


          }
          else{
            console.log(resApi.error);
          }
        } catch (error) {
           console.log(error)
        }
      }

      const handlePopup = () => {
        setShowCreteJob(false)
      }
    
    return (
        <>
          <form className="crete-project-form" onSubmit={handleSubmit}>
            <div className="create-project-form__group">
              <h2 className="create-project-form__heading">Offer a job in your project! Choose a Job and add a description:</h2>
            </div>

            <div className="create-project-form__group">
              <select 
                type="select" 
                name="jobs"
                className="create-project-form__input"
                style={{color: "#999"}}
                id="job-select"
                value={inputJob}
                onChange={handleChangeJob}
              >
                <option >Please choose a job:</option>
                {
                  jobs.map((job) => 
                  <option key={job._id} value={job._id}>{job.title}</option>)
                }
              </select>
            </div>

            <div className="create-project-form__group">
              <textarea
                  id="jobDescription"
                  name="jobDescription"
                  type="text"
                  className="create-project-form__input"
                  style={{width:"100%"}}
                  placeholder="Job description..."
                  rows="8" 
                  cols="50"
                  value={addJob.jobDescription}
                  onChange={handleChangeDescription}
                />
              <label 
                htmlFor="jobDescription"
                className="create-project-form__label"
              >Job description...</label>

            </div>

            <div className="create-project-form__buttons-container">
              <input type="button"  value="Cancel" onClick={handlePopup} className="button-primary" />
              <input type="submit" value="Add Job" className="button-primary" />
            </div>
          
          </form>  
        </>
    )
}

export default AddProjectDetail
