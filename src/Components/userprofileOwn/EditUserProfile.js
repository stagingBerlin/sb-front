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
    const [avatarPreview, setAvatarPreview] = useState("")

    const history = useHistory()

    // hier we will store our fetched jobs from API
    const [jobs, setJobs]= useState([])

    // hier we will store our selected job's ids
    const [jobId, setJobId] = useState([])

    // state for MultipleSelect Component sended as props
    // names of jobs are going top be stored
    const [jobName, setJobName] = useState([])

    const avatarChange = (e) => {
      let fileSelected = e.target.files[0];

      if(!fileSelected) return

      let fileReader = new FileReader()
      fileReader.readAsDataURL( fileSelected )

      fileReader.onloadend = (ev) => {
        setAvatarPreview( fileReader.result )
      };
  };

    console.log(user.avatar);

    // this method will find the selected job in the jobs array and store the ids in the jobId state
    const getJobIds = () => {
      const tempArr = []
      jobName.map(item => {
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
         const res = await updateUser( user._id , {...update, avatar: avatarPreview, profession: jobId})
         setUser(res)
         history.push('/account/profile')
      } catch (error) {
         console.log(error)
      }
    }
    
    return (
        <>
          <form onSubmit={handleSubmit}>
            <div className="avatar">
              <label className="avatar__label" htmlFor="avatar">
                <img
                  className="avatar__img"
                  width="100"
                  height="100"
                  src={
                        avatarPreview
                      ? avatarPreview
                      : user.avatar
                  }
                  alt="avatar"
                />
              </label>
              <input
                id="avatar"
                name="avatar"
                className="avatar__file"
                type="file"
                accept="image/*"
                onChange={(e) => avatarChange(e)}
              />
            </div>
              <label htmlFor="name">Name: </label>
              <input
                id="name"
                name="name"
                type="text"
                //value={update.name}
                placeholder={user.name}
                onChange={handleInput}
              />
              <label for="email">Email: </label>
              <input
                id="email"
                name="email"
                type="email"
                value={user.email}
                disabled
              />
              <label htmlFor="username">Username: </label>
              <input
                name="username"
                type="text"
                id="username"
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
        </>
    )
}

export default EditUserProfile
