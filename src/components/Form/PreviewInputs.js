import Input from './Input'
import React from 'react'

const PreviewInputs = ({
  formInputs,
  inputValues
}) => formInputs.map((formInput, i) => <div
  key={i.toString()}
  className='input-container preview'
> 
  {console.log(formInput)}
  <div className='label'>{formInput.label}</div>
  <input readOnly={true} />
</div>)

export default PreviewInputs
