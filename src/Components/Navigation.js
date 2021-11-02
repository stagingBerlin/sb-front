import React, { useContext, useState } from 'react'
import { NavLink } from "react-router-dom"
import { UserContext } from '../context/UserContext'
import { Signout } from '../helpers/authHelpers/apiCallsAuth'

export default function Navigation() {

    const { user, setUser } = useContext(UserContext)
    const [ outMsg, setOutMsg ] = useState();

    const handleClick = async () => {
      const resp = await Signout()
      setUser();
      setOutMsg(resp);
      setTimeout(()=> {
        setOutMsg()
      }, 5000);
    };
    

    const activeStyle = { 
        fontWeight: "bold",
        color: "#1f6e6c",
        textDecoration: "underline",
      };
    

    return (
        <>
            <nav className="navigation">
              <div className="navigation__logoBox">
                <NavLink 
                  to="/account/dashboard" 
                  className="navigation__link navigation__link--AppName"
                >
                <i className="fas fa-ad navigation__logo"></i>
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
                {user ? (
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
          </ul>
        </nav>
          {
            outMsg ? 
            <div className="outMsg">
              {outMsg.message}
            </div>
            :
            <></>
          }
    </>
   )
};
