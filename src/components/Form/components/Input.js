import _ from 'lodash'
import React from 'react'

const Input = ({
  disableTabs,
  errorMessage,
  handleInputChange,
  handleOnBlur,
  inputValues,
  label,
  placeholders,
  readOnly,
  type
}) => <div className={`input-container ${type}${errorMessage ? ' error' : ''}`}>
  <div className='label'>{label}</div>
  {placeholders.map((placeholder, i) => <input
    key={i}
    onBlur={(e) => handleOnBlur(type, e.target.value)}
    onChange={(e) => handleInputChange(e.target.value, type, placeholder)}
    placeholder={placeholder}
    name={placeholder}
    readOnly={readOnly}
    tabIndex={disableTabs ? -1 : ''}
    type='text'
    value={type === 'date' ? inputValues[placeholder] : inputValues}
  />)}
  {errorMessage
    ? <div className='error-label'>{errorMessage}</div>
    : null}
</div>

export default Input