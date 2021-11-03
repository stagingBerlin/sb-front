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
        <div className="grid-col-2">
          <img src="" alt="" />
        </div>
        <div className="grid-col-2">available</div>
        { user.isHiring ? 
        <NavLink to="/account/editproject" className="button-grid-2fr grid-col-2">Create Project</NavLink>
        : <NavLink to="/account/editprofile" className="button-grid-2fr grid-col-2">Edit Profile</NavLink> }
        
        
        <div className="grid-col-2">
          <div>Network</div>
          <DashboardNetwork />
        </div>
        <div className="grid-col-2">
          <div>Current Project</div>
          <DashboardProjectsCurrent />
        </div>
        <div className="grid-col-4 grid-col-span-5">
          <DashboardFeed />
        </div>
        <div className="grid-col-9">
          <DashboardProjectsFeatured />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
