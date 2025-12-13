import React ,{useState} from "react";
import { Link , Navigate, useNavigate } from "react-router-dom";
import "./AuthStyle.css";
import AuthServices from "../../Services/AuthServices";
 import toast from 'react-hot-toast';
import { getErrorMessage } from "../../Utils/ErrorMessage";

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
const navigate = useNavigate()
  //login function
  const loginHandler = async(e) => {
  try{
    e.preventDefault();
    const data = {email,password};
    const res = await AuthServices.loginUser(data);
    toast.success(res.data.message)
    navigate('/home');
    // to keep user logged in even after refreshing the page
    //json.stringify -> coverting object to string (while sving) cause localstorage only understands strings , objects cannot be stored directly
    localStorage.setItem("todoapp",JSON.stringify(res.data));
    console.log(res.data);
  }catch(err){
    toast.error(getErrorMessage(err))
    console.log(err)
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
