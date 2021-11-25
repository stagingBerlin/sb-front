import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { getProjects } from "../../helpers/apiCalls";
import { Link } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";

//* ////////////////// MUI ///////////////////////////
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.08),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(0),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
//* ///////////////////////////////////////////////

function ShowProjects() {
  const { user, projects, setProjects, viewProject, setViewProject } =
    useContext(UserContext);
  const [isMyRole, setIsMyRole] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [showWhat, setShowWhat] = useState("none");
  const [errorMsg, setErrorMsg] = useState("");

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
        return new Date(x.deadline) - new Date(y.deadline);
      });
      setViewProject([...urgent]);
    } else {
      setViewProject(projects);
    }
  }, [isMyRole, showWhat]);

  const handleChange = (e) => {
    setShowWhat(e.target.value);
  };

  function filterByRole() {
    setIsMyRole(!isMyRole);
  }

  function textSearch(e) {
    e.preventDefault();
    const text = keyword.toLowerCase();
    setErrorMsg("");
    const filtered = viewProject.filter((item) => {
      return (
        item.authorship.toLowerCase().includes(text) ||
        item.title.toLowerCase().includes(text) ||
        item.description.toLowerCase().includes(text)
      );
    });

    if (keyword && filtered.length === 0) {
      setErrorMsg(`No projects found under "${keyword}".`);
    } else if (keyword && filtered) {
      setErrorMsg("");
      setViewProject([...filtered]);
    } else {
      setErrorMsg("");
      setViewProject(projects);
    }
  }

  return (
    <>
      <div className="grid-container">
        <div
          className="grid-col-2 grid-col-span-10"
          style={{ marginTop: "3rem" }}
        >
          <h1>All Projects</h1>
          <div style={{ display: "flex" }}>
            <div style={{ width: "100%" }}>
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
            </div>
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

            <form onSubmit={textSearch}>
              <Search sx={{ mt: -1, mx: "auto", width: 4, height: 30 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </Search>
            </form>
          </div>
        </div>
        {errorMsg ? (
          <h2 className="grid-col-2 grid-col-span-10">{errorMsg}</h2>
        ) : null}
        <div className="grid-col-2 grid-col-span-10" id="project-grid">
          {viewProject.map((project, i) => (
            <div style={{ marginTop: "3rem" }} key={i}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/account/allprojects/${project._id}`}
                state={{ viewProject: [] }}
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
