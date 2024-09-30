// Header.js

import React from 'react';
import logo from '../assests/images/nasfarm-logo.jpg'
import { Link } from 'react-router-dom';
// import './src/styles/Header.css'
import '../styles/Header.css'
const Header = () => {
  return (
    <header className="header">
      <div className="logo">
      <img src={logo} alt="Logo" width="120" height="100" class="d-inline-block rounded align-text-top" />
        {/* <a href="/">NASRADAMUFF FARM</a> */}
      </div>
      <nav className="nav-menu">
        <ul>
      <li><Link to="/">Home</Link></li>
          
          <li>
        <Link to="/about">About Us</Link>
          </li>

          <li>
              <Link to="/services">Services</Link>
          </li>

          <li>
              <Link to="/contact">Contact us</Link>
          </li>
  
        </ul>
      </nav>
      <div className="user-actions">
  
        {/* <a href="/login" className="btn-login">Login</a> */}
         <Link to="/login" className='btn-login'>Login</Link>
        {/* <a href="/register" className="btn-register">Register</a> */}
        <Link to="/login" className='btn-register'>Register</Link>
      </div>
    </header>
  );
}

export default Header;
