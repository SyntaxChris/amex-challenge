import React, { Component } from 'react'
import AmexLogo from './AmexLogo'
import '../styles/header'

const Header = () => <header className='header'>
  <div className='container'>
    <div className='content left'><AmexLogo /></div>
    <div className='content mid' />
    <div className='content right' />
  </div>
</header>

export default Header
