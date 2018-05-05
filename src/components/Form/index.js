import EditInputs from './EditInputs'
import Input from './Input'
import PreviewInputs from './PreviewInputs'
import React from 'react'
import './form.scss'

const Form = ({
  buttons,
  errorFields,
  formInputs,
  handleButtonClick,
  handleInputChange,
  handleOnBlur,
  inputValues,
  offset,
  preview,
  title
}) => <div className='form-container'>
  <div className='form-header'>
    <div className='title'>{title}</div>
  </div>
  <form>
    <div
      className='form-scroller'
      style={{ marginLeft: `-${offset * 100}%` }}
    >
      <div className='form-view'>
        <EditInputs
          errorFields={errorFields}
          formInputs={formInputs}
          handleInputChange={handleInputChange}
          handleOnBlur={handleOnBlur}
          inputValues={inputValues}
          preview={preview}
        />
      </div>
      <div className='form-view'>
        <PreviewInputs
          formInputs={formInputs}
          inputValues={inputValues}
          preview={preview}
        />
      </div>
      <div className='form-view'></div>
    </div>
  </form>
  <div className='btn-container'>
    {buttons.map((btn, i) => <button
      className='form-btn'
      key={i.toString()}
      onClick={() => handleButtonClick(btn.label)}
    >
      {btn.label}
    </button>)}
  </div>
</div>

export default Form