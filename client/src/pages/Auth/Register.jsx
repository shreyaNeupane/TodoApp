import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AuthStyle.css";
import AuthServices from "../../Services/AuthServices";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 const navigate = useNavigate()
  //login function
  const registerHandler = async (e) => {
    try{
    e.preventDefault();
    const data = {username,email,password};
    const res = await AuthServices.registerUser(data);
    toast.success(res.data.message)
    navigate('/login');
    console.log(res.data);
  }catch(error){
    toast.error("something went wrong")
    console.log(error)
  }
  };
  return (
    <div className="form-container">
      <div className="form">
        <div className="mb-3">
          <p className="welcome">Create Account</p>
          <p>Sign up to get started</p>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-bottom">
          <p className="text-center">
            Already Have an account? Please <Link to="/login">Login</Link>
          </p>
          <button type="submit" className="login-btn" onClick={registerHandler}>
            REGISTER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
