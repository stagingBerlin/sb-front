import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { useHistory} from 'react-router'
import { addJobToList } from '../../helpers/apiCallsAddJob'
import BasicSelect from './BasicSelect.js'

const AddProjectDetail = ({data}) => {

  console.log(data._id);
  
  const history = useHistory()
    const { jobs, ownProjects, setOwnProjects} = useContext(UserContext)

    const [ jobId, setJobId ] = useState("")
    const [ addJob, setAddJob ] = useState({
      description :""
    })

    const [ jobList, setJobList ] = useState([])

    const handleChange  = (e) => {
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
          console.log(resApi);
          setJobList(resApi.jobList)

        } catch (error) {
           console.log(error)
        }
      
      }

      console.log(jobList);
    
    const backToProject = () => {
        return history.push('/account/project')
      }
  

    return (
        <>
          <h2> Project {data.title} is newly created. Add jobs to this project.</h2>
          <form onSubmit={handleSubmit}>

            <BasicSelect
              jobs={jobs}
              jobId={jobId}
              setJobId={setJobId}
            />

            <textarea
                name="description"
                type="text"
                placeholder="Job description..."
                rows="8" 
                cols="50"
                onChange={handleChange}
              />
            <input type="submit" value="Add Job" className="button-grid-2fr grid-col-2" />
          
          </form>  
          <div>
            {
              jobList.map((item, i)=> {
                return (
                  
                  <div key={i}>
                    <h4>{item.job.title}</h4>
                    <p>Description: {item.description}</p>
                  </div>
                  
                )
              })
            }

          </div> 

        </>
    )
}

export default AddProjectDetail
