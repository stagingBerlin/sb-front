import React, {useState, useContext } from 'react'
import { UserContext } from "../../context/UserContext"
import { NavLink } from "react-router-dom"
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 28,
    height: 28,
    border: `1px solid ${theme.palette.background.paper}`,
    backgroundColor: "hotpink",
    
}));

function UserProfileOwn() {

    const { user } = useContext(UserContext)

    return (
        <div className="grid-container">
        
           <div className="grid-col-2 grid-col-span-3">
              <h2>{user.username}'s profile</h2>
              
              <Stack direction="row" spacing={2}>
              {user.isHiring ? (
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                    <SmallAvatar alt="Manager" src="/static/images/avatar/1.jpg" />
                    }
                >
                    <Avatar sx={{ width: 94, height: 94 }} alt="profile pic" src={user.avatar} />
                </Badge>
                ) : (
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent=""
                >
                    <Avatar sx={{ width: 94, height: 94 }} alt="profile pic" src={user.avatar} />
                </Badge>
              )}
              </Stack>
              
               {/* <img src={user.avatar} width="50%" style={{"borderRadius": "50%"}} alt="profile" /> */}
              <p>Name: {user.name ?? ""}</p>
              <p>Roles: 
              {user.isHiring ? " [Project Manager] " : null}
              {user.profession.map((job, i)=> job.title).join(', ')} </p>
              <p>Email: {user.email}</p>
              <p>{user.isHiring ? "Owning Projects:" : "Applied Projects:"}</p>
              <p>Bookmarked Projects: </p>
              <NavLink to="/account/editprofile"  className="button-grid-2fr grid-col-2">EDIT</NavLink>     
           </div>
          
        </div>
    )
}

export default UserProfileOwn
