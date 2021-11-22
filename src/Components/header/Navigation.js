import React, { useContext, useState } from "react"
import { NavLink, Link } from "react-router-dom"
import { UserContext } from "../../context/UserContext"
import { Signout } from "../../helpers/authHelpers/apiCallsAuth"

//*************  MUI ************/
import MuiAppBar from '@mui/material/AppBar'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { styled, useTheme } from '@mui/material/styles'
import GitHubIcon from '@mui/icons-material/GitHub'
import HomeIcon from '@mui/icons-material/Home'
import EmailIcon from '@mui/icons-material/Email'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SearchIcon from '@mui/icons-material/Search'
import PeopleIcon from '@mui/icons-material/People'
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

const drawerWidth = 180

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
)

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  
}))
//*****************************/


export default function Navigation() {
  const { user, setUser } = useContext(UserContext)
  const [outMsg, setOutMsg] = useState()

 //*************  MUI ************/
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
//*****************************/

  const handleClick = async () => {
    const resp = await Signout()
    setUser()
    setOutMsg(resp)
    setTimeout(() => {
      setOutMsg()
    }, 5000)
  }

  const activeStyle = {
    fontWeight: "bold",
    color: "#1f6e6c",
    // textDecoration: "underline",
  };

  return (
    <>
      <nav className="navigation border-left-nav border-right-nav">
        <div className="navigation__logoBox">
          <NavLink
            to="/account/dashboard"
            className="navigation__link navigation__link--AppName"
            activeStyle={activeStyle}
          >
            <div className="logo navigation__link">
              <img src="/img/SB_Logo.svg" alt="" />
            </div>
          </NavLink>
          <NavLink
            to="/account/dashboard"
            className="navigation__link navigation__link--AppName">
            <h5 className="navigation__title">Staging Berlin</h5>
          </NavLink>
          <NavLink
            to="/about"
            className="navigation__link navigation__link--AppName"
            activeStyle={activeStyle}
          >
            About
          </NavLink>
        </div>

        <ul className="navigation__list">
          {user && !user.isHiring ? (
            <>
              <li className="navigation__item">
                <NavLink
                  to="/account/dashboard"
                  className="navigation__link"
                  activeStyle={activeStyle}
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/account/profile"
                  className="navigation__link"
                  activeStyle={activeStyle}
                >
                  My Profile
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/account/search"
                  className="navigation__link"
                  activeStyle={activeStyle}
                >
                 Job Search
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/"
                  className="navigation__link"
                  onClick={handleClick}
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : user && user.isHiring ? (
            <>
              <li className="navigation__item">
                <NavLink
                  to="/account/dashboard"
                  className="navigation__link"
                  activeStyle={activeStyle}
                >
                  Dashboard
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/account/profile"
                  className="navigation__link"
                  activeStyle={activeStyle}
                >
                  My Profile
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/account/project"
                  className="navigation__link"
                  activeStyle={activeStyle}
                >
                  My Project
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/"
                  className="navigation__link"
                  onClick={handleClick}
                >
                  Logout
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="navigation__item">
                <NavLink
                  to="/signup"
                  activeStyle={activeStyle}
                  className="navigation__link"
                >
                  SignUp
                </NavLink>
              </li>
              <li className="navigation__item">
                <NavLink
                  to="/login"
                  activeStyle={activeStyle}
                  className="navigation__link"
                >
                  Login
                </NavLink>
              </li>
            </>
          )}
          { user ? (
          <li className="navigation__item">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerOpen}
              // sx={{ ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
          </li>
          ) : null }
        </ul>
      </nav>
      <div className="deko-bars-container-nav">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar border-bottom-nav"></div>
        <div className="curve-left border-right-nav border-top-nav"></div>
        <div className="curve-right border-left-nav border-top-nav"></div>
        <div></div>
      </div>

      {/**************** MuI Sidebar ***************/}
      { user ? (
        <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader style={{marginTop: '-14px'}}>
          <IconButton onClick={handleDrawerClose}>
            <MenuIcon /> 
          </IconButton>
        </DrawerHeader>
        <Divider style={{marginTop: '-11px'}} />

        <List>
        <Link to='/account/profile' className="navigation__link"><ListItem button >
          <ListItemIcon > <AccountCircleIcon /> </ListItemIcon>
          <ListItemText > My Profile </ListItemText>
         </ListItem></Link>

        <Link to='/account/dashboard' className="navigation__link"><ListItem button >
          <ListItemIcon > <HomeIcon /> </ListItemIcon>
          <ListItemText > Dashboard </ListItemText>
         </ListItem></Link>

        <Link to='/account/project' className="navigation__link"><ListItem button >
          <ListItemIcon > <DashboardIcon  /> </ListItemIcon>
          <ListItemText >My Projects</ListItemText>
         </ListItem></Link>

        <Link to='/account/search' className="navigation__link"><ListItem button >
          <ListItemIcon > <SearchIcon /> </ListItemIcon>
          <ListItemText >Project Search</ListItemText>
         </ListItem></Link>

        <Link to='/account/people' className="navigation__link"><ListItem button >
          <ListItemIcon > <PeopleIcon className="icons"/> </ListItemIcon>
          <ListItemText >My Networks</ListItemText>
         </ListItem></Link>
        </List>

        <Divider />
        <List sx={{ 
          display: 'flex',
          justifyContent: 'space-around',
          p: 1,
          m: 1,
          }}>
        
          <IconButton 
              href="mailto:stagingBerlin@gmail.com" >
              <EmailIcon />
          </IconButton>
          <IconButton 
              href="https://github.com/stagingBerlin" 
              target="_blank" >
              <GitHubIcon />
          </IconButton>
          <IconButton
              color="inherit"
              edge="end"
              onClick={handleClick}   
          >
              <LogoutIcon />
          </IconButton>
          
        </List>
      </Drawer>
      ) : null }
      {/*********************************/}

      {outMsg ? <div className="outMsg">{outMsg.message}</div> : <></>}
    </>
  );
}
