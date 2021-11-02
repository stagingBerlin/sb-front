import React, {useState, useContext } from 'react'
import { UserContext } from "../../context/UserContext"

function UserProfileOwn() {
    const { user, setUser } = useContext(UserContext)
    const { profile, setProfile } = useState()

    return (
        <>
          profile page
        </>
    )
}

export default UserProfileOwn
