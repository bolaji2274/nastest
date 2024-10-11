import React from 'react'
import Header from './Header'
import AppFooter from '../pages/AppFooter'

function NotFound() {
  return (
    <div>
      <Header/>
      <div style={{margin:'20%'}}>
        <h1 className='text-center'>Page Not Found</h1>
      </div>
      <AppFooter/>
    </div>
  )
}

export default NotFound
