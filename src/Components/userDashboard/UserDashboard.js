import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { UserContext } from '../../context/UserContext'
import DashboardFeed from "./DashboardFeed";
import DashboardProjectsCurrent from "./DashboardProjectsCurrent";
import DashboardProjectsFeatured from "./DashboardProjectsFeatured";
import DashboardNetwork from "./DashboardNetwork";

function UserDashboard() {

  const { user, setUser } = useContext(UserContext)

  return (
    <div>
      <div className="grid-container">
        {/* <div className="grid-col-2">
          <img src="" alt="" />
        </div> */}

        {/* <div className="grid-col-2">available</div> */}
        {/* { user.isHiring ? 
        <NavLink to="/account/editproject" className="button-grid-2fr grid-col-2">Create Project</NavLink>
        : <NavLink to="/account/editprofile" className="button-grid-2fr grid-col-2">Edit Profile</NavLink> } */}
        
        {/* <div className="grid-col-2">
          <div>Network</div>
          <DashboardNetwork />
        </div>
        <div className="grid-col-2">
          <div>Current Project</div>
          <DashboardProjectsCurrent /> */}

        <div className="grid-container-left grid-col-span-2 grid-col-2 border-right ">
          <div className="grid-col-1 grid-col-span-2">available</div>

          { user.isHiring ? 
        <NavLink to="/account/editproject" className="button-grid-2fr grid-col-1 border-right-none">Create Project</NavLink>
        : <NavLink to="/account/editprofile" className="button-grid-2fr grid-col-1 border-right-none">Edit Profile</NavLink> }

          {/* <button className="button-grid-2fr grid-col-1 border-right-none">
            Edit Profile
          </button>
          <button className="button-grid-2fr grid-col-1 border-right-none">
            Create Project
          </button> */}
          <div className="grid-col-1 grid-col-span-2">
            <div className="heading-centered-grid">
              <div>Network</div>
            </div>
            <DashboardNetwork />
          </div>
          <div className="grid-col-1 grid-col-span-2">
            <div className="heading-centered-grid">
              <div>Current Project</div>
            </div>
            <DashboardProjectsCurrent />
          </div>

        </div>
        <div className="grid-col-4 grid-col-span-5 grid-row-1 justify-items-end">
          <DashboardFeed />
        </div>
        <div className="grid-container-right grid-col-span-4">
          <div className="grid-col-span-4">
            <DashboardProjectsFeatured />
          </div>
        </div>
      </div>
    F</div>
  );
}

export default UserDashboard;
