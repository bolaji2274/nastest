import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/images/nasfarm-logo.jpg'
import About from '../pages/About';


const MyNavbar = () => {
  const [expanded, setExpanded] = useState(false);  // State for toggling navbar

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
            <Button variant="outline-info" className="ms-2" as={Link} to="/login">Login</Button>
            <Button variant="outline-info" className="ms-2" as={Link} to="/register">Register</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
