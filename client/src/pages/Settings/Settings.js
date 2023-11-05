import React, { useContext, useState } from "react";
import "./settings.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import { Context } from "../../context/Context";
import axios from "axios";

const Settings = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const { user,dispatch } = useContext(Context);
  const PF = "/images/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type:"UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    };
    //same function from update single Post
    //only the arguments are changed
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePic = filename;
      try {
        await axios.post("/api/upload", data);
      } catch (err) {}
    }
    try {
      const res = await axios.put("/api/users/" + user._id, updatedUser);
      setSuccess(true);
      dispatch({type:"UPDATE_SUCCESS",payload:res.data})
    } catch (err) {
      dispatch({type:"UPDATE_FAILURE"})
    }
  };

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
          <div className="settingsUpdateTitle">Update your account</div>
          <div className="settingsDeleteTitle">Delete your account</div>
        </div>
        <form action="" className="settingsForm" onSubmit={handleSubmit}>
          <label>Progile Picture</label>
          <div className="settingsPP">
            <img src={file ? URL.createObjectURL(file) :PF + user.profilePic} alt="profilepic" />

            <label htmlFor="fileInput">
              <i class="settingsPPIcon fa-solid fa-user"></i>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <label>Username</label>
          <input
            type="text"
            placeholder={user.username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder={user.email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="..."
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="settingsSubmit" type="submit">
            Update
          </button>
          {success && (
            <span style={{ color: "green", textAlign: "center",marginTop:"20px" }}>
              Profile updated successfully!
            </span>
          )}
        </form>
      </div>
      <Sidebar />
    </div>
  );
};

export default Settings;
