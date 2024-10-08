import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./views/HomePage";
import Dashboard from "./views/Dashboard";
import LoginPage from "./views/LoginPage";
import RegisterPage from "./views/RegisterPage";
import Navbar from './views/Navbar'
import NotFound from './views/NotFound';
import TestLogin from './views/TestLogin';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/test' element={<TestLogin/>}/>
            <Route path='/about' element={<About/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage/>} />
        <Route 
        path="/dashboard" 
        element={
        <PrivateRoute>
          <Dashboard/>    
        </PrivateRoute>
        } />
        <Route path='*' element={<NotFound/>}/>

       </Routes>
       </AuthProvider>
      </Router>
       
  )
}

export default App
