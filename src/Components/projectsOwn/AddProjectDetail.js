import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useHistory} from 'react-router'
import { addJobToList } from '../../helpers/apiCallsAddJob'
import BasicSelect from './BasicSelect.js'

const AddProjectDetail = ({data}) => {

  console.log(data._id);
  
  const history = useHistory()
    const { jobs } = useContext(UserContext)

    const [inputJob, setInputJob] = useState('');

    const [ jobId, setJobId ] = useState('')
    const [ addJob, setAddJob ] = useState({
      jobDescription :""
    })

    const [ jobList, setJobList ] = useState([])


    const handleChangeJob = (e) => {
      setInputJob(e.target.value);
      setJobId(e.target.value)
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
            job: jobId
          }

          const resApi = await addJobToList(data._id, myBody)
          
          if(!resApi.error){
            setJobList(resApi.jobList)
            setAddJob({
              jobDescription : ""
            })
            setInputJob("")
            setJobId('')
          }
          else{
            console.log(resApi.error);
          }
        } catch (error) {
           console.log(error)
        }
      }

    const backToProject = () => {
        return history.push('/account/project')
      }
  

    return (
        <>
          <h2> Project {data.title} is newly created. Add jobs to this project.</h2>
          <form onSubmit={handleSubmit}>

            <BasicSelect
              jobs={jobs}
              inputJob={inputJob}
              handleChangeJob={handleChangeJob}
            />

            <textarea
                name="jobDescription"
                type="text"
                placeholder="Job description..."
                rows="8" 
                cols="50"
                value={addJob.jobDescription}
                onChange={handleChangeDescription}
              />
            <input type="submit" value="Add Job" className="button-grid-2fr grid-col-2" />
          
          </form>  
          <div>
            {
              jobList.map((item, i)=> {
                return (
                  
                  <div key={i}>
                    <h4>Job: {item.job.title}</h4>
                    <p>Description: {item.jobDescription}</p>
                  </div>
                  
                )
              })
            }

          </div> 

        </>
    )
}

export default AddProjectDetail
