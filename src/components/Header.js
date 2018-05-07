import { connect } from 'react-redux' 
import React, { Component } from 'react'
import AmexLogo from './AmexLogo'
import '../styles/header'

const Header = ({ error, formFieldErrors }) => <header className='header'>
  <div className='container'>
    <div className='content left'><AmexLogo /></div>
    <div className='content mid' />
    <div className='content right' />
  </div>
  <div className={`error-bar${ error ? ' active' : ''}`}>
    <div className='error-msg-container'>
      {error}
    </div>
  </div>
</header>

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  error: state.app.error
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
