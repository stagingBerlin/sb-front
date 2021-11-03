import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { updateUser } from '../../helpers/apiCalls'


function EditUserProfile() {
    const { user, setUser } = useContext(UserContext)
    const [update, setUpdate] = useState({name: "", _id: user._id})
    
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
            value={update.name}
            placeholder={"Your name"}
            onChange={handleInput}
            />
            
            <input
            name="email"
            type="email"
            value={user.email}
            placeholder={"Your email"}
            onChange={handleInput}
            />
            
            <input
            name="username"
            type="text"
            value={update.username}
            placeholder={"Username"}
            onChange={handleInput}
            />

            
            <input 
            list="jobs" 
            name="profession" 
            placeholder="Profession"
            onChange={handleInput} 
            /> 
            <datalist id="jobs">
                <option value="actor" />
                <option value="dancer"/>
                <option value="costume" />
                <option value="singer" />
                <option value="light" />
                <option value="musician" /> 
                <option value="stage" />       
            </datalist>
             
            <input type="submit" value="UPDATE" className="button-grid-2fr grid-col-2" />
          </form>
        </div>
    )
}

export default EditUserProfile
