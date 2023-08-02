import React from 'react'
import logo from '../assets/logo.png'
import './header.css'

function Header() {
  return (
    <div className='head-main'>
        <div className='child'>
          <div className='child1'>
          <h2>COMPENSATION REQUEST PORTAL</h2>
          </div>
          <div className='child2'><img src={logo} alt=''/></div>
        </div>
    </div>
  )
}

export default Header
