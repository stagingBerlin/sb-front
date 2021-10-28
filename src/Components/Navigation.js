import React, {useContext, useState} from 'react'
import { NavLink } from "react-router-dom"
import { UserContext } from '../context/UserContext'

export default function Navigation() {

    const { user, setUser } = useContext(UserContext)
    const [ outMsg, setOutMsg ] = useState()

    const handleClick = async () => {
    //   const resp = await logout()
    //   setUser()
    //   setOutMsg(resp)
    //   setTimeout(()=> {
    //     setOutMsg()
    //   }, 5000)
    }
    

    const activeStyle = { 
        fontWeight: "bold",
        color: "#1f6e6c",
        textDecoration: "underline",
      }
    

    return (
        <>
            <nav className="navigation">
              <NavLink 
                to="/" 
                className="navigation__link navigation__link--AppName"
                >
                  <div className="navigation__logoBox">
                      <i class="fas fa-ad navigation__logo"></i>
                      <h5 className="navigation__title">Staging Berlin</h5>
              <NavLink
              to="/about"
              className="navigation__link navigation__link--AppName"
              >
              About
              </NavLink>
                  </div>    
              </NavLink>

            <ul className="navigation__list">
                {user ? (
                  <>
                  <li className="navigation__item">
                    <NavLink
                      to="/account/:id/dashboard"
                      className="navigation__link"
                      activeStyle={activeStyle}
                    >
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="navigation__item">
                    <NavLink
                      to="/account/:id/profile"
                      className="navigation__link"
                      onClick={handleClick}
                    >
                      My Profile
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
                      to="/login"
                      activeStyle={activeStyle}
                      className="navigation__link"
                    >
                    Login
                    </NavLink>
                  </li>
                  <li className="navigation__item">
                    <NavLink
                      to="/signup"
                      activeStyle={activeStyle}
                      className="navigation__link"
                    >
                      SignUp
                    </NavLink>
                  </li>
                </>
              )}
          </ul>
        </nav>
          {/* {
            outMsg ? 
            <div className="outMsg">
              {outMsg.message}
            </div>
            :
            ""
          } */}
    </>
   )
}
