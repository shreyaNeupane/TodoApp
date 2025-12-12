import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./AuthStyle.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //login function
  const registerHandler = (e) => {
    e.preventDefault();
    try {
      alert("Login Data " + email + " " + password + username);
    } catch (error) {
      console.log(error);
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
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
