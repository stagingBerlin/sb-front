import React, {useState, useContext } from 'react'
import { UserContext } from "../../context/UserContext"

function UserProfileOwn() {
    const { user, setUser } = useContext(UserContext)

    return (
        <div className="grid-container">
          <h2>{user.username}'s profile </h2>
        </div>
    )
}

export default UserProfileOwn
