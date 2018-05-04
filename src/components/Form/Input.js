import _ from 'lodash'
import React from 'react'

// text and email input component
const Input = ({
  action,
  errorFields,
  inputValue,
  label,
  placeholder,
  type
}) => <div className={`input-container${_.includes(errorFields, placeholder) ? ' error' : ''}`}>
  <div className='label'>{label}</div>
  <input
    onChange={(e) => action(e.target.value, type, placeholder)}
    type={type}
    placeholder={placeholder}
    value={inputValue}
  />
</div>

export default Input