import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { NavLink, Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import profile1 from "../../img/profile1.png";
import profile2 from "../../img/profile2.png";
import blue from "../../img/bluelogo.png";

/**************************** MUI FEATURES ****************************/
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
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: "black",
      width: 28,
      height: 28,
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

/*********************** Main Component Function **************************/
function UserProfileOwn() {
  const { user } = useContext(UserContext);

  return (
    <div className="grid-container">
      <div
        className="grid-row-6 grid-col-5 grid-col-span-4"
        style={{ marginTop: "3rem" }}
      >
        <h1 style={{ marginBottom: "1rem", textAlign: "center" }}>
          {user.username}'s Profile
        </h1>
        <div style={{ display: "flex" }}>
          <Stack direction="row" spacing={2}>
            {user.isHiring || user.ownedProject?.length !== 0 ? (
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "top", horizontal: "left" }}
                badgeContent={<Avatar {...stringAvatar("Project Manager")} />}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  variant="dot"
                >
                  <Avatar
                    sx={{ width: 94, height: 94 }}
                    alt="profile pic"
                    src={user.avatar}
                  />
                </StyledBadge>
              </Badge>
            ) : (
              <StyledBadge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
              >
                <Avatar
                  sx={{ width: 94, height: 94 }}
                  alt="profile pic"
                  src={user.avatar}
                />
              </StyledBadge>
            )}
          </Stack>

          <div style={{ margin: "1rem 3rem" }}>
            <h3>Name: {user.name ?? ""}</h3>
            <h3>
              Roles:
              {user.isHiring || user.ownedProject?.length !== 0
                ? " Project Manager ∙ "
                : ""}
              {user.profession.map((job, i) => job.title).join(" ∙ ")}{" "}
            </h3>
            <h3>Email: {user.email}</h3>
            <h3>
              {" "}
              {user.isHiring ? (
                <Link to="/account/project">My Own Projects</Link>
              ) : (
                <Link to="#">Applied Projects:</Link>
              )}
            </h3>
            <h3>My Networks</h3>
            <AvatarGroup
              max={4}
              sx={{
                "& .MuiAvatar-root": { width: 24, height: 24, fontSize: 15 },
              }}
            >
              <Avatar alt="first" src={profile1} />
              <Avatar alt="second" src={blue} />
              <Avatar alt="third" src={profile2} />
              <Avatar alt="fourth" src={profile1} />
              <Avatar alt="fifth" src={blue} />
              <Avatar alt="fifth" src={blue} />
            </AvatarGroup>
          </div>
        </div>
        <Link to="/account/editprofile" className="button-link-short">
          EDIT
        </Link>
      </div>
    </div>
  );
}

export default UserProfileOwn;
