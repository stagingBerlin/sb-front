import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
// import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { createNotification } from "../../helpers/apiCalls";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

//******** MUI ********//
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
//*********************/

const EinzelProjectOther = (id) => {
  const { user, projects, setProjects, viewProject, setViewProject } =
    useContext(UserContext);

  const [initialMessage, setInitialMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleApply = async (userId) => {
    const data = {
      projectId: id.id,
      toUser: userId,
      initialMessage: initialMessage,
    };
    const thisProject = (id) => projects.find((p) => p._id === id.id);
    const roles = thisProject(id).jobList.map((role) => role.job.title);
    const myRoles = user.profession.map((p) => p.title);
    const matchingRoles = roles.filter((r) => myRoles.includes(r));
    const appliedProjects = user.appliedProject.map((p) => p._id);
    setErrorMsg("");

    if (appliedProjects.includes(id.id)) {
      setErrorMsg(`You've already applied for this project.`);
    }

    if (matchingRoles.length === 0) {
      setErrorMsg(
        `No matching roles found. Check if the role suits your skills.`
      );
    } else {
      try {
        const res = await createNotification(data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBookmark = () => {};

  //******** MUI ********//
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setErrorMsg("");
  };

  //*********************/

  return (
    <>
      <div className="grid-container">
        <div
          className="grid-col-7 grid-col-span-8"
          style={{ paddingBottom: "20rem" }}
        >
          {viewProject &&
            viewProject
              .filter((p) => p._id === id.id)
              .map((item) => (
                <div key={item._id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "2rem 0 0.5rem",
                    }}
                  >
                    <h2>{item.title}</h2>
                    <h3 style={{ color: "#525254" }}>
                      Concept by {item.authorship}
                    </h3>
                  </div>
                  <div>
                    <img
                      src={item.images}
                      style={{ borderRadius: "4px", width: "auto" }}
                    ></img>
                    <p style={{ padding: "1rem 0" }}>
                      Description:{" "}
                      <span style={{ color: "#686b69" }}>
                        {item.description}
                      </span>
                       <Button onClick={handleBookmark}>Bookmark </Button>
                      {/*<Button onClick={handleBookmark}> Share </Button> */}
                    </p>

                    <p>
                      Roles:{" "}
                      {item.jobList.map((role, i) => (
                        <span key={i}>
                          <Button onClick={handleOpen}>{role.job.title}</Button>
                          <Modal
                            hideBackdrop
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="child-modal-title"
                            aria-describedby="child-modal-description"
                          >
                            <Box
                              sx={{
                                ...style,
                                width: 600,
                                maxWidth: "100%",
                              }}
                              component="form"
                              noValidate
                              autoComplete="off"
                            >
                              <h3
                                style={{
                                  width: "100%",
                                  paddingBottom: "1.5rem",
                                }}
                              >
                                {role.jobDescription}
                              </h3>
                              {errorMsg ? (
                                <Stack sx={{ width: "100%" }} spacing={2}>
                                  <Alert severity="error">{errorMsg}</Alert>
                                </Stack>
                              ) : null}
                              <TextField
                                id="standard-basic"
                                placeholder="Leave a message to the project manager"
                                label="Message to the project manager"
                                defaultValue="Please let me join."
                                variant="standard"
                                fullWidth
                                onChange={(e) =>
                                  setInitialMessage(e.target.value)
                                }
                              />
                              <Button
                                onClick={() => handleApply(item.owner._id)}
                              >
                                Apply
                              </Button>
                              <Button onClick={handleClose}>Close</Button>
                            </Box>
                          </Modal>
                        </span>
                      ))}{" "}
                      (click roles for details & apply)
                    </p>
                    <p>Participants: {item.jobList.participant}</p>
                    <p>Deadline: {item.deadline?.substr(0, 10)} </p>
                    <p>Starting on: {item.starting?.substr(0, 10)} </p>
                    <p>Contact: {user.username}</p>
                    <p>
                      Project status:{" "}
                      {item.isHiring ? "Hiring now" : "Not hiring"}
                    </p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default EinzelProjectOther;
