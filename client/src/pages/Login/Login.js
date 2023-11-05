import React, { useContext, useRef, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const {dispatch,isFetching} = useContext(Context)
  const [error, setError] = useState(false);

  const handleSubmit =async (e) => {
    e.preventDefault();
    setError(false)
    dispatch({type:"LOGIN_START"});
    try{
      const res =await axios.post("/api/auth/login",{
        username:userRef.current.value,
        password: passwordRef.current.value 
      })
      console.log("resp"+res.data)
      dispatch({type:"LOGIN_SUCCESS",payload:res.data});
    }catch(err){
      console.log("error"+err)
      setError(true)
      dispatch({type:"LOGIN_FAILURE"});
    }
  };


  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="enter your username..."
          ref={userRef}
        />
        <label>Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="enter your password..."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">
        <Link className="link" to="/register"></Link>
      </button>
      {error && <span style={{color:"red",marginTop:"10px"}}>Something went wrong</span>}
    </div>
  );
};

export default Login;
