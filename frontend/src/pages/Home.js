import React from 'react';
import { Container, Typography, Grid, Button, Box } from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
import chicken from '../assets/images/chicken-coop.jpg'; // Replace with the path to your hero image
import './Home.css'; // Custom CSS for extra styling
import Footer from './Footer'
import Navbar from '../views/Navbar'
import Header from '../views/Header'
import About from '../pages/About.js'
import AppFooter from './AppFooter.js';
import Contact from './Contact.js';
const Home = () => {
  return (
    <>
      {/* Hero Section */}
      {/* <Navbar/> */}
      <Header/>
      <Box className="hero" style={{ backgroundImage: `url(${chicken})`, width: "100%" }}>
        
        <Container maxWidth="lg" className="hero-content">
          <Typography variant="h2" color="white" gutterBottom>
            Welcome to Nasradamuff Farm
          </Typography>
          <Typography variant="h5" color="white" paragraph>
            Your Trusted Partner in Livestock Farming and Agro-Allied Ventures <br/>
            Whether you’re into fish farming, broilers, layers, or other livestock,
{/* we make it easy for you to apply for the resources you need, from birds or fish to feed and drugs and
We also empowering Farmers, Growing Livestock, and Sharing Profits */}
          </Typography>
          <Button variant="contained" color="primary" size="large">
            Get Started
          </Button>
        </Container>
      </Box>

      {/* Introduction Section */}
      <Container maxWidth="lg" className="intro-section">
        <About/>
        <Typography variant="h4" gutterBottom className='text-center'> 
          About Us
        </Typography>
        <Typography variant="body1" paragraph>
          At Nasradamuff Farm and Agro-Allied Ventures, we specialize in livestock farming, inventory management, 
          and providing farmers with the resources they need to succeed. With decades of experience in the 
          agro-industry, we ensure that our clients get the best livestock, feed, and farming support.
        </Typography>
      </Container>
      {/* // Continue Home.js */}

      {/* Services Section */}
      <Container maxWidth="lg" className="services-section">
        <Typography variant="h4" gutterBottom className='text-center'>
          Our Services
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={4}>
            <Box className="service-box">
              <Typography variant="h6">Livestock Provision</Typography>
              <Typography variant="body2" paragraph>
                We provide high-quality broilers, layers, fish, and other livestock to farmers, ensuring
                that they receive the healthiest and most productive stock.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className="service-box">
              <Typography variant="h6">Feed and Supplies</Typography>
              <Typography variant="body2" paragraph>
                Our farm provides premium feeds and necessary supplies for your livestock, making sure
                they grow healthy and strong.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box className="service-box">
              <Typography variant="h6">Farm Management Support</Typography>
              <Typography variant="body2" paragraph>
                We assist farmers with farm management, offering expert advice, training, and resources
                to ensure successful operations.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    {/* Testimonials Section */}
<Container maxWidth="lg" className="testimonials-section">
  <Typography variant="h4" gutterBottom>
    What Our Farmers Say
  </Typography>
  <Grid container spacing={4}>
    <Grid item xs={12} sm={6}>
      <Box className="testimonial-box">
        <Typography variant="body2" paragraph>
          "Nasradamuff Farm has been a game-changer for my livestock farming business. 
          The support and guidance I’ve received is unmatched."
        </Typography>
        <Typography variant="subtitle2">- Bolaji Hammed</Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6}>
      <Box className="testimonial-box">
        <Typography variant="body2" paragraph>
          "With the resources provided by Nasradamuff Farm, I’ve been able to scale my 
          farming operations and increase productivity tenfold."
        </Typography>
        <Typography variant="subtitle2">-Bolaji Hammed</Typography>
      </Box>
    </Grid>
  </Grid>
</Container>
  <Contact/>
    <AppFooter/>
    </>
  );
};

export default Home;
