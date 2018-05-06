import React from 'react'
import '../styles/loader.scss'

const Loader = ({ type }) => <div className={`loader-container ${type || ''}`}>
  <div className='spinner'>
    <div className='bounce1' />
    <div className='bounce2' />
    <div className='bounce3' />
    <div className='bounce4' />
  </div>
</div>

export default Loader
