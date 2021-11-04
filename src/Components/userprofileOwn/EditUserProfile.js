import React, { useState, useContext, useEffect} from 'react'
import { UserContext } from '../../context/UserContext'
import { updateUser } from '../../helpers/apiCalls'
import { getJobs } from '../../helpers/apiCalls'

function EditUserProfile() {
    const { user, setUser } = useContext(UserContext)
    const [update, setUpdate] = useState({name: "", _id: user._id})
    const [jobs, setJobs]= useState([])

    useEffect(() => {
      const getData = async () => {
        const res = await getJobs()
        const ress = Object.values(res)
        setJobs(ress[0])
        console.log(ress[0])
      }
      getData()
    },[])

    
    console.log(user)
    
    const handleInput = (e) => {
        console.log(e.target.name, " : ", e.target.value)
        setUpdate({ ...update, [e.target.name]: e.target.value })
      }
    console.log(update);
    const handleSubmit = async (e) => {
       e.preventDefault();
         try {
             
            const res = await updateUser(update)
            console.log(res)
            } catch (error) {
            console.log(error);
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
            //placeholder={"Your email"}
            //onChange={handleInput}
            disabled
            />
            
            <input
            name="username"
            type="text"
            //value={user.username}
            placeholder={user.username}
            onChange={handleInput}
            />

            <input 
            list="jobs" 
            name="profession" 
            placeholder="Profession"
            onChange={handleInput} 
            /> 
            <datalist id="jobs">
            {
              jobs && jobs.map((job, i)=> (
              <option value = {job.title} key={i} />
              ))
            }
            </datalist>
             
            <input type="submit" value="UPDATE" className="button-grid-2fr grid-col-2" />
          </form>
        </div>
    )
}

export default EditUserProfile
