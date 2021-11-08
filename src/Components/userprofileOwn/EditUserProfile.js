import React, { useState, useContext, useEffect} from 'react'
import { useHistory  } from 'react-router'
import { UserContext } from '../../context/UserContext'
import { updateUser } from '../../helpers/apiCalls'
import { getJobs } from '../../helpers/apiCalls'
import MultipleSelect from './MultipleSelect'


function EditUserProfile() {
    const { user, setUser } = useContext(UserContext)
    const [update, setUpdate] = useState({
      avatar : user.avatar,
      username : user.username,
      name: user.name,
    })

    // hier we will store our fetched jobs from API
    const [jobs, setJobs]= useState([])

    // hier we will store our selected job's ids
    const [jobId, setJobId] = useState([]);

    // state for MultipleSelect Component sended as props
    // names of jobs are going top be stored
    const [jobName, setJobName] = useState([]);

    // const history = useHistory()
    

    // this method will find the selected job in the jobsa rray and store the ids in the jobId state
    const getJobIds = () => {
      const tempArr = []
      jobName.forEach(item => {
        const findObj = jobs.find(job => job.title === item)
        tempArr.push(findObj._id)
      })
      setJobId(tempArr)
    }

    useEffect(() => {
      const getJobsApi = async () => {
        const res = await getJobs()
        setJobs(res)
      }
      getJobsApi()
      getJobIds()
    }, [jobName])

    const handleInput = (e) => {
        setUpdate({ 
          ...update, 
          [e.target.name]: e.target.value
         })
      }
    
    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        // we send to the BE as arguments user id and complete data we want to update in the user
         const res = await updateUser( user._id , {...update, profession: jobId})
         setUser(res)
      } catch (error) {
         console.log(error)
      }
    }
    
    return (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              type="text"
              //value={update.name}
              placeholder={user.name}
              onChange={handleInput}
            />
            
            <input
              name="email"
              type="email"
              value={user.email}
              disabled
            />
            
            <input
              name="username"
              type="text"
              //value={update.username}
              placeholder={user.username}
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
            
            <input type="submit" value="UPDATE" className="button-grid-2fr grid-col-2" />
          </form>
        </div>
    )
}

export default EditUserProfile
