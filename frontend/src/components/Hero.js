// import React, { useEffect, useState } from 'react';
import '../styles/Hero.css'; // Import CSS file for styling

const Hero = () => {
  // const [quote, setQuote] = useState('');

  // useEffect(() => {
  //   fetchQuote(); // Fetch initial quote on component mount
  // }, []);

  // const fetchQuote = async () => {
  //   try {
  //     const response = await fetch('https://api.quotable.io/random');
  //     const data = await response.json();
  //     setQuote(data.content);
  //   } catch (error) {
  //     console.error('Error fetching quote:', error);
  //   }
  // };

  return (
    <section className="hero">
      <div className="hero-content text-center">
        
        <h1 class="m-b-20"><strong>Welcome to Nasradamuff <br/> Farm and Agro Allied Ventures,</strong></h1>
        <p>Your trusted partner in livestock and agro-allied ventures</p>
                            <p class="m-b-40">Whether you’re into fish farming, broilers, layers, or other livestock, 
                  
                                <br/>we make it easy for you to apply for
                             the resources you need, from birds or fish to feed and drugs and <br/> 
                             We also empowering Farmers, Growing Livestock, and Sharing Profits</p>
        {/* <p className="quote">"{quote}"</p> */}
        {/* <button className="btn-primary" onClick={fetchQuote}> */}
        <button className='btn-primary btn-success btn-lg'>
          Explore Our Services
        </button>
      </div>
    </section>
  );
};

export default Hero;
