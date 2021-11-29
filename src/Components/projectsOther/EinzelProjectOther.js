import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";

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
    <div className="grid-container">
      <div className="grid-col-2 grid-col-span-4">
        {viewProject &&
          viewProject
            .filter((p) => p._id === id.id)
            .map((item) => (
              <div key={item._id}>
                <h2>{item.title}</h2>
                <p>Concept by {item.authorship}</p>
                <p>Description: {item.description}</p>
                <p>
                  Roles:
                  {item.jobList
                    .map((role) => {
                      return role.job.title
                    })
                    .join(" ∙ ")}
                    <Button onClick={handleOpen}>Show Description & Apply</Button>
                  <Modal
                    hideBackdrop
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="child-modal-title"
                    aria-describedby="child-modal-description"
                  >
                    <Box sx={{ ...style, width: 200 }}>
                      <h2 id="child-modal-title">Text in a child modal</h2>
                      <p id="child-modal-description">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit.
                      </p>
                      <Button onClick={handleClose}>Close</Button>
                    </Box>
                  </Modal>
                </p>
                <p>Participants: {item.jobList.participant}</p>
                <p>Deadline: {item.deadline?.substr(0, 10)} </p>
                <p>Starting on: {item.starting?.substr(0, 10)} </p>
                <p>Contact: {user.username}</p>
                <p>
                  Project status: {item.isHiring ? "Hiring now" : "Not hiring"}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default EinzelProjectOther;
