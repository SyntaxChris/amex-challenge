import React from 'react'
import '../styles/form.scss'

const Form = ({ title }) => <div className='form-container'>
  <div className='form-header'>{title}</div>
  
  <form>

    <div className='input-container'>
      <div className='label'>full name</div>
      <input type='text' placeholder='name' />
    </div>

    <div className='input-container date'>
      <div className='label'>date of birth</div>
      <input type='text' placeholder='mm' />
      <input type='text' placeholder='dd' />
      <input type='text' placeholder='yyyy' />
    </div>

    <div className='input-container'>
      <div className='label'>email address</div>
      <input type='email' placeholder='example@gmail.com' />
    </div>

  </form>
  
  <div className='btn-container'>
  </div>
</div>

export default Form