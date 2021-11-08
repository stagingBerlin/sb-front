import React, {useState, useContext } from 'react'
import { UserContext } from "../../context/UserContext"
import { NavLink } from "react-router-dom"
import axios from 'axios';

function UserProfileOwn() {
    const { user } = useContext(UserContext)

    return (
        <div className="grid-container">
        
           <div className="grid-col-2 grid-col-span-3">
              <h2>{user.username}'s profile</h2>
               <img src={user.avatar} width="50%" alt="profile" />
              <p>Name: {user.name ?? ""}</p>
              <p>Profession: {user.profession.map((job, i)=> job.title).join(', ')} </p>
              <p>Email: {user.email}</p>
              <p>{user.isHiring ? "Owning Projects:" : "Applied Projects:"}</p>
              <p>Bookmarked Projects: </p>
              <NavLink to="/account/editprofile"  className="button-grid-2fr grid-col-2">EDIT</NavLink>     
           </div>
          
        </div>
    )
}

export default UserProfileOwn
