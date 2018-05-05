import Input from './Input'
import React from 'react'

const EditInputs = ({
  errorFields,
  formInputs,
  handleInputChange,
  handleOnBlur,
  inputValues
}) => formInputs.map((formInput, i) => <Input
  errorMessage={errorFields[formInput.type]}
  handleInputChange={handleInputChange}
  handleOnBlur={handleOnBlur}
  inputValues={formInput.type === 'date'
    ? inputValues[formInput.type]
    : inputValues[formInput.label]}
  key={i.toString()}
  label={formInput.label}
  placeholders={formInput.placeholders}
  readOnly={formInput.readOnly}
  type={formInput.type}
/>)

export default EditInputs
