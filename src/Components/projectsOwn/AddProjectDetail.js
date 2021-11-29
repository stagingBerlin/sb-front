import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { addJobToList } from '../../helpers/apiCallsAddJob'
import BasicSelect from './BasicSelect.js'

const AddProjectDetail = ({
  newProject,
  setNewProject,
  setShowCreteJob
}) => {

 
  const { jobs } = useContext(UserContext)
  
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
              <h2 style={{textAlign: 'center', fontSize:'1.7rem', marginBottom:"3.5rem"}}>Offer a job in your project! Choose a Job and add a description:</h2>
            </div>

            <div className="create-project-form__group">
              <label htmlFor="job-select">Choose Job:</label>
              <select 
                type="select" 
                name="jobs"
                id="job-select"
                value={inputJob}
                onChange={handleChangeJob}
              >
                <option>--Please choose a job--</option>
                {
                  jobs.map((job) => 
                  <option key={job._id} value={job._id}>{job.title}</option>)
                }
              </select>
            </div>

            {/* <div className="create-project-form__group">

              <BasicSelect
                jobs={jobs}
                inputJob={inputJob}
                handleChangeJob={handleChangeJob}
              />
            </div> */}

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
