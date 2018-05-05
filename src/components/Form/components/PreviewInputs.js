import Input from './Input'
import React from 'react'

const PreviewInputs = ({
  formInputs,
  inputValues
}) => formInputs.map((formInput, i) => <div
  key={i.toString()}
  className='input-container preview'
> 
  <div className='label'>{formInput.label}</div>
  <input
    readOnly={true}
    tabIndex={-1}
    value={formInput.type === 'date'
      ? `${inputValues.date.mm}-${inputValues.date.dd}-${inputValues.date.yyyy}`
      : inputValues[formInput.type]}
    />
</div>)

export default PreviewInputs
