import React, { useState, useContext } from "react"
import { UserContext } from "../../context/UserContext"
import Link from "@mui/material/Link";

function DashboardFeed() {
  const { user, setUser, ownProjects, setOwnProjects  } = useContext(UserContext)
  console.log(user.bookmark)
  return (
    <div>
      <div className="post-container"
      style={{display: "flex", flexDirection:"column"}}>
        <div >
        {
          user.bookmark && user.bookmark.map(
           (project, i) => (
            <>
            <Link href={`/account/allprojects/${project._id}`} underline="hover"
            style={{display: "flex", flexDirection:"row", justifyContent: "space-around", padding: "6px"}}>
             <img src={project.images[0]} width="20%" style={{borderRadius: "4px"}}/>
            <h3 key={i} 
                style={{alignSelf: 'center'}}>
              {project.title} by {project.authorship}</h3>
           
              
            </Link>
            </>
            )
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
