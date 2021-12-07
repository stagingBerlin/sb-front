import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Link from "@mui/material/Link";

function DashboardFeed() {
  const { user } =
    useContext(UserContext);
 
  return (
    <div>
      <div
        className="post-container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div>
          {user.bookmark &&
            user.bookmark.map((project, i) => (
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
                    style={{ borderRadius: "4px",  marginLeft: "1.5rem" }}
                  />
                  <h3 style={{ alignSelf: "center", marginLeft: "1.5rem" }}>
                    {project.title} by {project.authorship}
                  </h3>
                </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardFeed;
