import Input from './Input'
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

export default EditInputs
