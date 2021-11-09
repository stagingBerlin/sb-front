import React, {useState, useContext } from 'react'
import { UserContext } from "../../context/UserContext"
import { NavLink } from "react-router-dom"
import { styled } from '@mui/material/styles'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Stack from '@mui/material/Stack'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }))

function stringAvatar(name) {
    return {
      sx: {
        bgcolor: 'black',
        width: 28, 
        height: 28 
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

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
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    badgeContent={
                    <Avatar {...stringAvatar('Project Manager')} />
                    }
                >
                 <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar sx={{ width: 94, height: 94 }} alt="profile pic" src={user.avatar} />
                    
                </StyledBadge>    
                </Badge>
                
                ) : (

                <StyledBadge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    variant="dot"
                >
                    <Avatar sx={{ width: 94, height: 94 }} alt="profile pic" src={user.avatar} />
                </StyledBadge>

              )}
              </Stack>
              
               {/* <img src={user.avatar} width="50%" style={{"borderRadius": "50%"}} alt="profile" /> */}
              <p>Name: {user.name ?? ""}</p>
              <p>Roles: 
              {user.isHiring ? " Project Manager ∙ " : null}
              {user.profession.map((job, i)=> job.title).join(' ∙ ')} </p>
              <p>Email: {user.email}</p>
              <p>{user.isHiring ? "My Own Project:" : "Applied Projects:"}</p>
              <p>My Networks: </p>
              <NavLink to="/account/editprofile"  className="button-grid-2fr grid-col-2">EDIT</NavLink>     
           </div>
          
        </div>
    )
}

export default UserProfileOwn
