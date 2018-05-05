import _ from 'lodash'
import React from 'react'
// text and email input component
const Input = ({
  errorMessage,
  handleInputChange,
  handleOnBlur,
  inputValues,
  label,
  placeholders,
  preview,
  readOnly,
  type
}) => <div className={`input-container ${type}${errorMessage ? ' error' : ''}`}>
  <div className='label'>{label}</div>
  {placeholders.map((placeholder, i) => <input
    key={i.toString()}
    onBlur={(e) => handleOnBlur(type, e.target.value)}
    onChange={(e) => handleInputChange(e.target.value, type, placeholder)}
    placeholder={placeholder}
    name={placeholder}
    readOnly={readOnly}
    tabIndex={preview ? -1 : ''}
    type='text'
    value={inputValues[placeholder]}
  />)}
  {errorMessage ? <div className='error-label'>{errorMessage}</div> : null}
</div>

export default Input