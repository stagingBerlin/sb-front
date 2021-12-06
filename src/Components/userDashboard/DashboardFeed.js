import React, { useState, useContext } from "react"
import { UserContext } from "../../context/UserContext"

function DashboardFeed() {
  const { user, setUser, ownProjects, setOwnProjects  } = useContext(UserContext)
  return (
    <div>
      <div className="post-container">
        <div className="grid-container-feed">
        {
          user.appliedProject && user.appliedProject.map(
           (project, i) => {
            <div >
              <h3 key={i}>
              Applied: {project.title} by {project.authorship}</h3>
              <img src={project.images[0]} />
            </div>
           } 
          )
        }
          {/* <textarea
            className="post-textarea grid-col-span-5 justify-content-end"
            rows="3"
          ></textarea>
          <button className="button-grid-2fr grid-col-4">Post</button> */}
        </div>
      </div>
    </div>
  );
}

export default DashboardFeed;
