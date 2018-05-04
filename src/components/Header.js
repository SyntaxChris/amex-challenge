import { connect } from 'react-redux' 
import React, { Component } from 'react'
import AmexLogo from './AmexLogo'
import '../styles/header'

const Header = ({ formFieldErrors }) => <header className='header'>
  <div className='container'>
    <div className='content left'><AmexLogo /></div>
    <div className='content mid' />
    <div className='content right' />
  </div>
  <div className={`error-bar`}>
    <div className='error-msg-container'>
      {/*Object.keys(formFieldErrors).map((val, i) => {
        return <div
          key={i.toString()}
          className='err-msg'
        >
          <div><b>{`${val} field : `}</b></div><div>{`${formFieldErrors[val]}`}</div>
        </div>
      })*/}
    </div>
  </div>
</header>

const mapDispatchToProps = {}

const mapStateToProps = state => ({
  formFieldErrors: state.people.formFieldErrors
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
