import InputContainer from './InputContainer'
import PropTypes from 'prop-types'
import React from 'react'
import '../styles/input.scss'

const EditInputs = ({
  errorFields,
  formFields,
  handleInputChange,
  handleOnBlur,
  inputValues
}) => formFields.map((formInput, i) => {
  const label = formInput.label.split(' ').join('_')

  return <InputContainer
    errorMessage={errorFields[formInput.type]}
    handleInputChange={handleInputChange}
    handleOnBlur={handleOnBlur}
    inputValues={inputValues[label]}
    key={i}
    label={formInput.label}
    fields={formInput.fields}
    readOnly={formInput.readOnly}
    type={formInput.type}
  />
})


EditInputs.propTypes = {
  errorFields: PropTypes.object.isRequired,
  formFields: PropTypes.arrayOf(PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({
      label: PropTypes.string.isRequired,
      placeholder: PropTypes.string.isRequired
    })).isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
  })).isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  inputValues: PropTypes.object.isRequired
}

export default EditInputs
