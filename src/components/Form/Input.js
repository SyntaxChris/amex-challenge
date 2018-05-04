import _ from 'lodash'
import React from 'react'

// text and email input component
const Input = ({
  action,
  errorMessage,
  inputValue,
  label,
  placeholder,
  type
}) => <div className={`input-container${errorMessage ? ' error' : ''}`}>
  <div className='label'>{label}</div>
  <input
    name={label}
    onChange={(e) => action(e.target.value, type, placeholder)}
    type={type}
    placeholder={placeholder}
    value={inputValue}
  />
</div>

export default Input