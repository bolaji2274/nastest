import React, { useState, useContext } from 'react';
import { jwtDecode } from 'jwt-decode'
import AuthContext from '../context/AuthContext'
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/images/nasfarm-logo.jpg'
import About from '../pages/About';
import '../styles/nav.css'


// function Navbar() {
//   const {user, logoutUser} = useContext(AuthContext)
//   const token = localStorage.getItem("authTokens")

//   if (token){
//     const decode = jwtDecode(token)
//     var user_id = decode.user_id
//   }

const MyNavbar = () => {
  const [expanded, setExpanded] = useState(false);  // State for toggling navbar
  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  if (token){
    const decode = jwtDecode(token)
    var user_id = decode.user_id
  }
  return (
    <Navbar expanded={expanded} expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        {/* <Navbar.Brand href="#">MyBrand</Navbar.Brand> */}
        <Link to='/' >
         <img style={{width:"80px", height:"80px", padding:"7px", borderRadius:"50%"}} src={logo} alt=""/>
        </Link>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setExpanded(expanded ? false : true)}  // Toggle state on click
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/services">Services</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
          </Nav>

          <Nav>
            {/* <NavDropdown title="More" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action2">Another Action</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action3">Something Else</NavDropdown.Item>
            </NavDropdown> */}
            {token === null &&
              <>
              {/* <li className="nav-item">
                <Link to="/login" variant="outline-info" className="nav-link">Login</Link>
              </li> */}
              {/* <li className="nav-item">
                <Link to="/register" variant="outline-info" className="nav-link">Register</Link>
              </li> */}
               <Button variant="outline-info" className="ms-2 head-log" as={Link} to="/login">Login</Button>
              </>
               }
               {token !== null &&
              <><li className="nav-item">
                <Link to="/dashboard" className="nav-link" >Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" style={{cursor: "pointer"}} onClick={logoutUser}>Logout</Link>
              </li>
              </>
               }
              
            {/* <Button variant="outline-info" className="ms-2 head-log" as={Link} to="/login">Login</Button> */}
            {/* <Button variant="outline-info" className="ms-2" as={Link} to="/register">Register</Button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
