import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { updateUser } from "../../helpers/apiCalls";
import MultipleSelect from "./MultipleSelect";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import { styled } from "@mui/material/styles";
// import Badge from "@mui/material/Badge";
// import Avatar from "@mui/material/Avatar";
// import { fontSize } from "@mui/system";

function EditUserProfile() {
  const { user, setUser, jobs, setJobs } = useContext(UserContext);
  const [update, setUpdate] = useState({
    avatar: user.avatar,
    username: user.username,
    name: user.name,
  });
  const [avatarPreview, setAvatarPreview] = useState("");

  const history = useHistory();

  const profession = user.profession.map((item) => item.title);
  const [jobName, setJobName] = useState(profession);

  const avatarChange = (e) => {
    let fileSelected = e.target.files[0];

    if (!fileSelected) return;

    let fileReader = new FileReader();
    fileReader.readAsDataURL(fileSelected);

    fileReader.onloadend = (ev) => {
      setAvatarPreview(fileReader.result);
    };
  };

  const handleInput = (e) => {
    setUpdate({
      ...update,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobId = jobs
      .filter((job) => {
        return jobName.includes(job.title);
      })
      .map((item) => item._id);

    try {
      // we send to the BE as arguments user id and complete data we want to update in the user
      const res = await updateUser(user._id, {
        ...update,
        avatar: avatarPreview,
        profession: jobId,
      });
      setUser(res);
      //  console.log(user)
      history.push("/account/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const delAvatar = async () => {
    try {
      const res = await updateUser(user._id, {
        ...update,
        avatar:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/320px-User-avatar.svg.png",
      });
      setUser(res);
    } catch (error) {
      console.log(error);
    }
  };

  const backToProfile = () => {
    return history.push("/account/profile");
  };

  return (
    <div className="grid-container">
      <form onSubmit={handleSubmit} className="form grid-col-5 grid-col-span-4 grid-row-6">
        <div className="avatar">
          <label className="avatar__label" htmlFor="avatar">
              <img
                className="avatar__img"
                width="100"
                height="100"
                src={avatarPreview ? avatarPreview : user.avatar}
                alt="avatar"
              />
            {/* <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <AddCircleIcon style={{ marginRight: "25", color: "white" }} />
              }
            >
            </Badge> */}
          </label>
          <input
            id="avatar"
            name="avatar"
            className="avatar__file"
            type="file"
            accept="image/*"
            onChange={(e) => avatarChange(e)}
          />
        </div>

        <input
          type="button"
          onClick={delAvatar}
          value="Delete Avatar"
          className="button-link-short"
        />
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder={user.name}
          onChange={handleInput}
        />
        <label for="email">Email: </label>
        <input
          id="email"
          name="email"
          type="email"
          value={user.email}
          disabled
        />
        <label htmlFor="username">Username: </label>
        <input
          name="username"
          type="text"
          id="username"
          placeholder={user.username}
          onChange={handleInput}
        />

        <MultipleSelect
          jobName={jobName}
          setJobName={setJobName}
          jobs={jobs}
          setJobs={setJobs}
          user={user}
        />
        <div style={{ display: 'flex' }}>
        <input
          type="submit"
          value="UPDATE"
          className="button-link-short"
        />
        <input
          type="submit"
          value="BACK"
          className="button-link-short"
          onClick={backToProfile}
        />
        </div>
      </form>
    </div>
  );
}

export default EditUserProfile;
