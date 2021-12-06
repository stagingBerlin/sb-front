import React, { useContext } from "react";
import Link from "@mui/material/Link";
import { UserContext } from "../../context/UserContext";

function DashboardProjectsCurrent() {
  const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } =
    useContext(UserContext);

  return (
    <div>
    <div className="post-container" style={{display: "flex", flexDirection:"column"}}>
      {ownProjects &&
          ownProjects.map((project, i) => (
            <>
              <Link href={`/account/project/${project._id}`} underline="hover"
              style={{display: "flex", flexDirection:"row", padding: "6px"}}>
                <h3 key={i} >
                <span style={{backgroundColor: "#d5f7da"}}>Owned </span> {project.title} by {project.authorship} 
                </h3>
                <img src={project.images[0]} />
              </Link>
            </>
          ))}
        { user.appliedProject &&
          user.appliedProject.map((project, i) => (
            <div >
            <Link href={`/account/allprojects/${project._id}`} underline="hover" style={{display: "flex", flexDirection:"row", justifyContent: "space-around", padding: "6px"}}>
              <img src={project.images[0]} width="20%" style={{borderRadius: "4px"}} />
               <h3 key={i} style={{alignSelf: 'center'}}> <span style={{backgroundColor: "#f7e9c3"}}>Applied </span> {project.title} by {project.authorship} </h3>
            </Link>
            </div>
          ))}
    </div>
    </div>
  );
}

export default DashboardProjectsCurrent;
