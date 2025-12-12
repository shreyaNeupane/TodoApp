import React from 'react'
import {Link} from 'react-router-dom'
import todoimage from '../../assets/images/todoimage.jpg'
import './Landing.css';

const Landing = () => {
  return (
    <div className='hero'>
      <div className="intro-text">
        <h1>
          <span className="tagline1">Organize work and life</span><br/>
          <span className="tagline2">finally</span>
        </h1>
        <p>
          todo helps you finish you boost productivity and improve focus...
        </p>
        <Link className="btn red" to="/register"> Register Now</Link>
        <Link className="btn blue" to="/login">Login</Link>
      </div>
      <div>
        <img src={todoimage} alt="todoimage"  width={"100%"} height={515}/>
      </div>
     
    </div>
  )
}

export default Landing
