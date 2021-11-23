import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { getProjects } from "../../helpers/apiCalls";
import { Link } from "react-router-dom";

function ShowProjects() {
  const { user, setUser, jobs, setJobs, ownProjects, setOwnProjects } =
    useContext(UserContext);
  const [viewProject, setViewProject] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isMyRole, setIsMyRole] = useState(false);
  const [isNewest, setIsNewest] = useState(false);

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

  useEffect(() => {
    const myRole = user.profession.map((role) => role.title);
    
    if (isMyRole && !isNewest) {
      const filtered = projects.filter((list) => {
        for (const item of list.jobList) {
          return myRole.includes(item.job.title);
        }
      });
      setViewProject(filtered);
    } else if (isMyRole && isNewest) {
      const filtered = projects.filter((list) => {
        for (const item of list.jobList) {
          return myRole.includes(item.job.title);
        }
      });

      const newest = filtered.sort((x, y) =>
        y.createdAt.localeCompare(x.createdAt)
      );

      setViewProject([...newest]);
    } else if (!isMyRole && isNewest) {
      const newest = [...projects].sort((x, y) =>
        y.createdAt.localeCompare(x.createdAt)
      );

      setViewProject(newest);
    } else {
      setViewProject(projects);
      console.log(viewProject);
    }
  }, [isMyRole, isNewest]);

  // useEffect(() => {
  //     if (isMyRole && isNewest) {
  //         console.log('here')
  //         const newest = viewProject.sort((x,y)=> y.createdAt.localeCompare(x.createdAt))

  //         setViewProject(newest)

  //     } else if (!isMyRole && isNewest) {
  //         const newest = projects.sort((x,y)=> y.createdAt.localeCompare(x.createdAt))

  //         setViewProject(newest)

  //     } else {
  //         setViewProject(projects)
  //     }
  // }, [isNewest])

  function filterByRole() {
    setIsMyRole(!isMyRole);
  }

  function sortNewest() {
    setIsNewest(!isNewest);
  }

  return (
    <>
      <div className="grid-container">
        <div
          className="grid-col-2 grid-col-span-4"
          style={{ marginTop: "3rem" }}
        >
          <h1>All Projects</h1>
          <div>
            <label htmlFor="isMyRole">
              Show projects containing my role(s) only
            </label>
            <input
              type="checkbox"
              name="isMyRole"
              checked={isMyRole}
              onChange={filterByRole}
            />

            <label htmlFor="isNewest">Newest Project First</label>
            <input
              type="checkbox"
              name="isNewest"
              checked={isNewest}
              onChange={sortNewest}
            />
          </div>
        </div>

        <div className="grid-col-2 grid-col-span-10" id="project-grid">
          {viewProject.map((project, i) => (
            <div style={{ marginTop: "3rem" }} key={i}>
              <Link to={`/account/allprojects/${project._id}`}>
                <img
                  src={project.images[0]}
                  width="100%"
                  style={{ borderRadius: "4px" }}
                ></img>
                <h2>
                  {project.title} by {project.authorship}
                </h2>
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