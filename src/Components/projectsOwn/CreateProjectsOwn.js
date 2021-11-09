import React, { useState, useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { useHistory } from 'react-router'
import { createProject } from '../../helpers/apiCalls'
import { getJobs } from '../../helpers/apiCalls'
import MultipleSelect from '../userprofileOwn/MultipleSelect'

const CreateProjectsOwn = () => {
    
    const { user, setUser } = useContext(UserContext)
    const [data, setData] = useState({
      title : "",
      contact : user.name,
      authorship: user.name,
      description: "",
      roles: [],
      participants: []
    })
    const [jobs, setJobs]= useState([])
    const [jobId, setJobId] = useState([])
    const [jobName, setJobName] = useState([])

    const history = useHistory()

    useEffect(() => {
      const getJobsApi = async () => {
        const res = await getJobs()
        setJobs(res)
      }
      getJobsApi()
      getJobIds()
    }, [jobName])

    const getJobIds = () => {
      const tempArr = []
      jobName.map(item => {
        const findObj = jobs.find(job => job.title === item)
        tempArr.push(findObj._id)
      })
      setJobId(tempArr)
    }

    const handleInput = (e) => {
      setData({ 
        ...data, 
        [e.target.name]: e.target.value
      })
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
          const res = await createProject({...data, roles: jobId})
          setUser(res)
          console.log(res)
          history.push('/account/project')
      } catch (error) {
         console.log(error)
      }
    }

    return (
        <>
          <form id="pform" onSubmit={handleSubmit}>
              <label htmlFor="title">Title: </label>
              <input
                id="title"
                name="title"
                type="text"
                placeholder="Project Title"
                onChange={handleInput}
              />
              <label htmlFor="contact">Contact: </label>
              <input
                id="contact"
                name="contact"
                type="text"
                value={user.username}
                disabled
              />
              <label htmlFor="concept">Concept: </label>
              <input
                name="concept"
                type="text"
                id="concept"
                defaultValue={user.name}
                // placeholder="change only when it's not your own project"
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
            
            <input type="submit" value="Create" className="button-grid-2fr grid-col-2" />
          </form>
        </>
    )
}

export default CreateProjectsOwn
