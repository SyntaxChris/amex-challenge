import _ from 'lodash'
import React from 'react'

const Input = ({
  errorMessage,
  handleInputChange,
  handleOnBlur,
  inputValues,
  label,
  offset,
  fields,
  readOnly,
  type
}) => <div className={`input-container ${type}${errorMessage ? ' error' : ''}`}>
  <div className='label'>{label}</div>
  {fields.map((field, i) => <input
    aria-label={field}
    aria-required='true'
    key={i}
    // validate form if content exists
    onBlur={(e) => handleOnBlur(type, e.target.value)}
    // add content to redux store
    onChange={(e) => handleInputChange(e.target.value, type, field)}
    placeholder={field}
    name={field}
    readOnly={readOnly}
    // prevent tabbing into form fields when out of view
    tabIndex={offset > 0 ? -1 : ''}
    type='text'
    value={type === 'date' ? inputValues[field] : inputValues}
  />)}
  {errorMessage
    ? <div className='error-label'>{errorMessage}</div>
    : null}
</div>

export default Input