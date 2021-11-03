import React, {useState, useContext } from 'react'
import { UserContext } from "../../context/UserContext"

function UserProfileOwn() {
    const { user, setUser, authIsDone } = useContext(UserContext)

    return (
        <div className="grid-container">
          {user.username}'s profile
        </div>
    )
}

export default UserProfileOwn
