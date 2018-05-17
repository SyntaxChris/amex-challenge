import _ from 'lodash'
import PropTypes from 'prop-types'
import React from 'react'
import '../styles/input.scss'

const InputContainer = ({
  errorMessage,
  handleInputChange,
  handleOnBlur,
  inputValues,
  label,
  offset,
  fields,
  readOnly,
  type
}) => <div
  className={`input-container ${type}${errorMessage ? ' error' : ''}`}
>
  <div className='label'>{label}</div>
  {fields.map((field, i) => <input
    // aria-label={field.label}
    aria-required='true'
    key={i}
    // validate form if content exists
    onBlur={(e) => handleOnBlur(type, e.target.value)}
    // add content to redux store
    onChange={(e) => handleInputChange(e.target.value, type, field.label)}
    placeholder={field.placeholder}
    // name={field.label}
    readOnly={readOnly}
    // prevent tabbing into form fields when out of view
    tabIndex={offset > 0 ? -1 : ''}
    type='text'
    value={type === 'date' ? inputValues[field.label] : inputValues}
  />)}
  {errorMessage
    ? <div className='error-label'>{errorMessage}</div>
    : null}
</div>

InputContainer.propTypes = {
  errorMessage: PropTypes.string,
  handleInputChange: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  inputValues: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  label: PropTypes.string.isRequired,
  offset: PropTypes.number,
  fields: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired
  })).isRequired,
  readOnly: PropTypes.bool,
  type: PropTypes.string.isRequired
}

export default InputContainer