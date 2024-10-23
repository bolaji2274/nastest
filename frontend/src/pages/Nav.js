import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

function Nav() {
  return (
    <div>
<nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
    <div class="container">
      {/* <!-- Logo --> */}
      <a class="navbar-brand" href="#">
        <img src="" alt="Logo" style={{width: '50px', height: '50px'}}/>
      </a>

      {/* <!-- Toggle Button for mobile view --> */}
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      {/* <!-- Collapsible Navbar Content --> */}
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#about">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#services">Services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">Contact</a>
          </li>
        </ul>

        {/* <!-- Right-aligned buttons --> */}
        <ul class="navbar-nav">
          <li class="nav-item">
            <a href="/login" class="btn btn-outline-info ms-2">Login</a>
          </li>
          <li class="nav-item">
            <a href="/register" class="btn btn-outline-info ms-2">Register</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>


    </div>
  )
}

export default Nav
