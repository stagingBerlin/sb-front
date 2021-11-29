import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Hidden } from "@mui/material";

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

  const handleApply = () => {};
  const handleBookmark = () => {};

  //******** MUI ********//
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //*********************/

  return (
    <>
      <div className="grid-container" style={{ overflow: "hidden" }} height="auto">
        <div className="grid-col-6 grid-col-span-8">
          {viewProject &&
            viewProject
              .filter((p) => p._id === id.id)
              .map((item) => (
                <div key={item._id}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "2rem 0 1rem",
                    }}
                  >
                    <h2>{item.title}</h2>
                    <h3>Concept by {item.authorship}</h3>
                  </div>
                  <div >
                    <img src={item.images} width="auto"></img>
                    <p style={{ padding: "1rem 0" }}>Description: {item.description.substr(1, 400)}...<Button onClick={handleBookmark}> Bookmark </Button><Button onClick={handleBookmark}> Share </Button></p>
                    <p>
                      Roles:{" "}
                      {item.jobList.map((role) => (
                        <Button onClick={handleOpen}> {role.job.title} </Button>
                      ))}{" "}
                      (click each role to read descriptions & apply)
                      <Modal
                        hideBackdrop
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                      >
                        <Box sx={{ ...style, width: 400 }}>
                          {item.jobList.map((role) => (
                            <>
                              <h3 id="child-modal-title">
                                {" "}
                                {role.jobDescription}
                              </h3>
                            </>
                          ))}

                          <Button onClick={handleApply}>Apply</Button>
                          <Button onClick={handleClose}>Close</Button>
                        </Box>
                      </Modal>
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
