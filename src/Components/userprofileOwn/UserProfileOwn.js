import React, {useState, useContext } from 'react'
import { UserContext } from "../../context/UserContext"

function UserProfileOwn() {
    const { user, setUser, authIsDone } = useContext(UserContext)

    return (
        <div className="grid-container">
           <div className="grid-col-2 grid-col-span-3">
              <h2>{user.username}'s profile</h2>
              <img src={user.avatar} width="50%" />
              <p>Name:</p>
              <p>Profession: </p>
              <p>Email: {user.email}</p>
              <p>{user.isHiring ? "Owning Projects:" : "Applied Projects:"}</p>
              <p>Bookmarked Projects: </p>
              
              <p></p>
           </div>
          
        </div>
    )
}

export default UserProfileOwn
