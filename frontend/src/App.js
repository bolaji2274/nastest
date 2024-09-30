// App.js

import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import HomePage from './pages/HomePage';
import About from './components/About';
import ServicesPage from './components/ServicesPage';
import Contact from './components/Contact';
import Login from './pages/Login';


// import AppFooter from './components/AppFooter'

function App() {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/about" element={<About />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/services" element={<ServicesPage />}></Route>
      </Routes>
      <Routes>
        <Route exact path="/contact" element={<Contact />}></Route>
      </Routes>
    </Router>
  
      
    </div>
  );
}

export default App;
