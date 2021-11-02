import React, {useState, useContext, useEffect } from 'react'
import { UserContext } from "../../context/UserContext"
import { fetchUser } from "../../helpers/apiCalls"

function UserDashboard() {
    const { user, setUser } = useContext(UserContext)
    const { profile, setProfile } = useState([])
    
    
    console.log(user) //give
    
    function onClick() {

    }

    return (
        <>
        
          <h2>{user.username}'s Profile</h2>
          <button className="button-primary" >Edit</button>
            <p> </p>
            
        </>
    )
}

export default UserDashboard

