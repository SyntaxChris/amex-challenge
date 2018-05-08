import Input from './Input'
import PropTypes from 'prop-types'
import React from 'react'
import '../styles/input.scss'

const EditInputs = ({
  errorFields,
  formInputs,
  handleInputChange,
  handleOnBlur,
  inputValues
}) => {
  return formInputs.map((formInput, i) => <Input
    errorMessage={errorFields[formInput.type]}
    handleInputChange={handleInputChange}
    handleOnBlur={handleOnBlur}
    inputValues={formInput.type === 'date'
      ? inputValues[formInput.type]
      : inputValues[formInput.label]}
    key={i}
    label={formInput.label}
    fields={formInput.fields}
    readOnly={formInput.readOnly}
    type={formInput.type}
  />)
}

EditInputs.propTypes = {
  errorFields: PropTypes.object.isRequired,
  formInputs: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  inputValues: PropTypes.object.isRequired
}

export default EditInputs
