import React, { useState, useContext } from "react";
import Link from "@mui/material/Link";
import { UserContext } from "../../context/UserContext";
import DashboardFeed from "./DashboardFeed";
import DashboardProjectsCurrent from "./DashboardProjectsCurrent";
import DashboardProjectsFeatured from "./DashboardProjectsFeatured";
import DashboardNetwork from "./DashboardNetwork";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

/****************** MUI FUNCTION ************************/
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.2)",
      opacity: 0,
    },
  },
}));

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "black",
      width: 20,
      height: 20,
      // border: '1px solid currentColor'
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

/****************** MAIN FUNCTION ************************/
function UserDashboard() {
  const { user, setUser, ownProjects, setOwnProjects } =
    useContext(UserContext);

  return (
    <div className="content-margin-top">
      <div className="grid-container">
        <div className="grid-col-6 grid-col-span-2 justify-self-center">
          <Stack direction="row" spacing={2}>
            {user.isHiring ? (
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                badgeContent={<Avatar {...stringAvatar("Project Manager")} />}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                  className="margin-bttm-l"
                >
                  <Avatar
                    sx={{ width: 100, height: 100 }}
                    alt="profile pic"
                    src={user.avatar}
                    className="border"
                  />
                </StyledBadge>
              </Badge>
            ) : (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                className="margin-bttm-l"
              >
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  alt="profile pic"
                  src={user.avatar}
                  className="border"
                />
              </StyledBadge>
            )}
          </Stack>
        <div style={{marginTop: "-12px", marginBottom: "12px"}}>
              <Link
                href="/account/createproject"
                underline="hover"
                className="button-grid-1fr border-right-none justify-items-center"
              >
                <div >Create a new Project</div>
              </Link>
      
            <Link
              href="/account/editprofile"
              underline="hover"
              className="button-grid-1fr border-right-none  justify-items-center button"
            >
             <div style={{ textAlign: "center"}}> Edit Profile</div>
            </Link>
            </div>
        </div>
      </div>
      <div className="grid-container">
        <div className="grid-col-span-5 grid-col-2 min-height-85 border-right ">
          <div className="grid-container-left grid-col-span-2">
           

            <div className="grid-col-1 grid-col-span-6">
              <div className="heading-centered-grid">
                <div>Current Project</div>
              </div>
              <DashboardProjectsCurrent />
            </div>
          </div>
        </div>

        <div className="grid-col-7 grid-col-span-5">
        <div className="heading-centered-grid">
            <div>Bookmarked Project</div>
          </div>
          <DashboardFeed />
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
