import DateInput from './DateInput'
import Input from './Input'
import React from 'react'
import './form.scss'

// reusable form container component
const Form = ({
  buttons,
  errorFields,
  formInputs,
  inputValues,
  logo,
  title
}) => <div className='form-container'>
  <div className='form-header'>
    <div className='logo'>{logo}</div>
    <div className='title'>{title}</div>
  </div>
  <form>
    {formInputs.map((formInput, i) => formInput.type === 'date'
      ? <DateInput
        action={formInput.action}
        errorFields={errorFields}
        inputValues={inputValues.date}
        key={i.toString()}
        label={formInput.label}
        placeholders={formInput.placeholders}
        type={formInput.type}
      />
      : <Input
        action={formInput.action}
        errorFields={errorFields}
        inputValue={inputValues[formInput.placeholder]}
        key={i.toString()}
        label={formInput.label}
        placeholder={formInput.placeholder}
        type={formInput.type}
      />)}
  </form>
  <div className='btn-container'>
    {buttons.map((btn, i) => <button
      className='form-btn'
      key={i.toString()}
      onClick={() => btn.action(btn.label)}
    >
      {btn.label}
    </button>)}
  </div>
</div>

export default Form