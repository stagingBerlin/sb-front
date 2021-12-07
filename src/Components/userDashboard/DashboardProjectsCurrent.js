import React, { useContext } from "react";
import Link from "@mui/material/Link";
import { UserContext } from "../../context/UserContext";

function DashboardProjectsCurrent() {
  const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } =
    useContext(UserContext);

  return (
    <div>
      <div
        className="post-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        {ownProjects &&
          ownProjects.map((project, i) => (
              <Link
                key={project._id}
                className="dashboard-boxes"
                href={`/account/project/${project._id}`}
                underline="hover"
              >
                <img
                  src={project.images[0]}
                  style={{ borderRadius: "4px", marginLeft: "1.5rem" }}
                  height="100rem"
                  width="100rem"
                />
                <h3 style={{ alignSelf: "center", marginLeft:"1.5rem" }}>
                  <span
                    style={{
                      
                      backgroundColor: "#d5f7da",
                      padding: "4px",
                      marginRight: "1rem",
                    }}
                  >
                    Owned{" "}
                  </span>{" "}
                  {project.title} by {project.authorship}
                </h3>
              </Link>
          ))}

        {user.appliedProject &&
          user.appliedProject.map((project, i) => (
           
              <Link
                key={project._id}
                className="dashboard-boxes"
                href={`/account/allprojects/${project._id}`}
                underline="hover"
              >
                <img
                  src={project.images[0]}
                  height="100rem"
                  width="100rem"
                  style={{ borderRadius: "4px", marginLeft: "1.5rem" }}
                />
                <h3 key={i} style={{ alignSelf: "center", marginLeft: "1.5rem" }}>
                  {" "}
                  <span
                    style={{
                      backgroundColor: "#f7e9c3",
                      padding: "4px",
                      marginRight: "1rem",
                    }}
                  >
                    Applied{" "}
                  </span>{" "}
                  {project.title} by {project.authorship}{" "}
                </h3>
              </Link>
            
          ))}
      </div>
    </div>
  );
}

export default DashboardProjectsCurrent;
