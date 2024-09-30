import React from 'react'
import Header from '../components/Header'
import AppFooters from '../components/AppFooters'
import  '../styles/login.css'
import user_icon from '../assests/icons/person.png'
import mail_icon from '../assests/icons/mail.png'
import password_icon from '../assests/icons/password.png'

function Login() {
  return (
    <>
    <Header/> 
    <div className='login-container'>
        <div className='login-header'>
            <div className="login-text">Sign Up</div>
            <div className="login-underline"></div>
        </div>
        <div className="login-inputs">
            <div className='login-input'>
                <img src={user_icon} width={40} height={40} alt=''/>
                <input type='text' placeholder='Name'/>
            </div>

             <div className='login-input'>
                <img src={mail_icon} width={40} height={40} alt=''/>
                <input type='email' placeholder='Email'/>
            </div>

             <div className='login-input'>
                <img src={password_icon} width={40} height={40} alt=''/>
                <input type='password' placeholder='Password'/>
            </div>
        </div>
        <div className='login-forgot-password'>Forgot password ? <span>click Here !</span></div>
        <div className='login-submit-container'>
            <div className='login-submit'>Sign Up</div>
            <div className='login-submit'>Login</div>
        </div>
    </div>
    <AppFooters/>
    </>
  )
}

export default Login
