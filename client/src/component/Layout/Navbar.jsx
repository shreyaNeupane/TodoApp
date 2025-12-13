import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [username, setUsername] = useState("");
   const navigate = useNavigate()
  //logout function
  const logoutHandler = () =>{
    localStorage.removeItem('todoapp')
    toast.success('logout sucessfully')
    navigate('/login')
  }
  useEffect(() => {
    //json.parse -> string to object (when reading) as it has been stringify while saving
    const userData = JSON.parse(localStorage.getItem("todoapp"));
    console.log("userdata" + userData && userData.user.username);
    setUsername(userData && userData.user.username);
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <i className="fa-solid fa-circle-user"></i>&nbsp;
          <span>Welcome {username}!</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/todolist">
                  My todo List
                </Link>
              </li>
              <li className="nav-item">
                <button className="nav-link" to="/login" onClick={logoutHandler}>
                  LogOut &nbsp;
                  <i className="fa-solid fa-arrow-right-from-bracket" />
                </button>{" "}
              </li>
              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
