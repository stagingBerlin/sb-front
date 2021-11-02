import React, { useState, useContext } from "react";

import DashboardFeed from "./DashboardFeed";
import DashboardProjectsCurrent from "./DashboardProjectsCurrent";
import DashboardProjectsFeatured from "./DashboardProjectsFeatured";
import DashboardNetwork from "./DashboardNetwork";

function UserDashboard() {

  return (
    <div>
      <div className="grid-container">
        <div className="grid-col-2">
          <img src="" alt="" />
        </div>
        <div className="grid-col-2">available</div>
        <button className="button-grid-2fr grid-col-2">Edit Profile</button>
        <button className="button-grid-2fr grid-col-2">Create Project</button>
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
