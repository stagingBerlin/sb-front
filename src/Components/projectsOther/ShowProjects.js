import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { getProjects } from "../../helpers/apiCalls";
import { Link } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function ShowProjects() {
  const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } =
    useContext(UserContext);
  const [viewProject, setViewProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isMyRole, setIsMyRole] = useState(false);
  const [showWhat, setShowWhat] = useState("none");

  useEffect(() => {
    const allProjects = async () => {
      try {
        const res = await getProjects();

        if (!res.error) {
          setProjects(res);
          setViewProject(res);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    allProjects();
  }, []);
  console.log(showWhat);

  useEffect(() => {
    const myRole = user.profession.map((role) => role.title);

    if (isMyRole && showWhat === "newest") {
      const filtered = projects.filter((list) => {
        for (const item of list.jobList) {
          return myRole.includes(item.job.title);
        }
      });

      const newest = filtered.sort((x, y) =>
        y.createdAt.localeCompare(x.createdAt)
      );

      setViewProject([...newest]);
    } else if (isMyRole && showWhat === "urgent") {
      const filtered = projects.filter((list) => {
        for (const item of list.jobList) {
          return myRole.includes(item.job.title);
        }
      });

      const urgent = filtered.sort((x, y) => {
        return new Date(x.deadline) - new Date(y.deadline);
      });

      setViewProject([...urgent]);
    } else if (isMyRole && showWhat === "none") {
      const filtered = projects.filter((list) => {
        for (const item of list.jobList) {
          return myRole.includes(item.job.title);
        }
      });
      setViewProject(filtered);
    } else if (!isMyRole && showWhat === "newest") {
      const newest = [...projects].sort((x, y) =>
        y.createdAt.localeCompare(x.createdAt)
      );

      setViewProject(newest);
    } else if (!isMyRole && showWhat === "urgent") {
      const urgent = [...projects].sort((x, y) => {
        console.log(new Date(y.deadline));
        return new Date(x.deadline) - new Date(y.deadline);
      });
      setViewProject([...urgent]);
    } else {
      setViewProject(projects);
      console.log(viewProject);
    }
  }, [isMyRole, showWhat]);

  const handleChange = (e) => {
    setShowWhat(e.target.value);
  };

  function filterByRole() {
    setIsMyRole(!isMyRole);
  }

  return (
    <>
      <div className="grid-container">
        <div
          className="grid-col-2 grid-col-span-10"
          style={{ marginTop: "3rem" }}
        >
          <h1>All Projects</h1>
          <div>
            <label htmlFor="isMyRole" style={{ marginRight: ".5%" }}>
              Show projects containing my role(s) only
            </label>
            <input
              type="checkbox"
              name="isMyRole"
              checked={isMyRole}
              onChange={filterByRole}
              style={{ marginRight: "2%" }}
            />

            <FormControl sx={{ m: -1, minWidth: 80, height: 20 }} size="small">
              <InputLabel id="demo-simple-select-helper-label">
                Sort by
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={showWhat}
                label="showWhat"
                onChange={handleChange}
              >
                <MenuItem value="none">None</MenuItem>
                <MenuItem value="newest">Newest</MenuItem>
                <MenuItem value="urgent">Closest Deadlines</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>

        <div className="grid-col-2 grid-col-span-10" id="project-grid">
          {viewProject.map((project, i) => (
            <div style={{ marginTop: "3rem" }} key={i}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/account/allprojects/${project._id}`}
                className="button-link"
              >
                <img
                  src={project.images[0]}
                  width="100%"
                  style={{ borderRadius: "4px" }}
                ></img>
                <h3 style={{ textAlign: "center" }}>
                  {project.title} by {project.authorship}
                </h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ShowProjects;
// sort push splice
// filter find map
