import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function Nav() {
  return (
    <div>
<nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
  <div className="container">
    {/* Logo */}
    <a className="navbar-brand" href="#">
      <img src="your-logo.png" alt="Logo" style={{ width: 50, height: 50 }} />
    </a>
    {/* Toggle Button for mobile view */}
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    {/* Collapsible Navbar Content */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">
            Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#about">
            About
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#services">
            Services
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#contact">
            Contact
          </a>
        </li>
      </ul>
      {/* Right-aligned buttons */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a href="/login" className="btn btn-outline-info ms-2">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a href="/register" className="btn btn-outline-info ms-2">
            Register
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>


    </div>
  )
}

export default Nav
