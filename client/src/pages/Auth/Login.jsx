import React ,{useState} from "react";
import { Link } from "react-router-dom";
import "./AuthStyle.css";

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  //login function
  const loginHandler = (e) => {
    e.preventDefault()
    try{
 alert("Login Data " + email + " " + password);
    }catch(error){
      console.log(error)
    }
   
  }
  return (
    <>
      <div className="form-container">
        <div className="form">
          <div className="mb-3">
            <p className="welcome">Welcome back</p>
            <p className="login">Login to get started</p>
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="form-bottom">
            <p className="text-center">
              Not A User? Please <Link to="/register">Register</Link>
            </p>
            <button type="submit" className="login-btn" onClick={loginHandler}>
              LOGIN
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
