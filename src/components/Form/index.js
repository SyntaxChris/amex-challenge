import CheckMark from './components/CheckMark'
import EditInputs from './components/EditInputs'
import Input from './components/Input'
import PreviewInputs from './components/PreviewInputs'
import React from 'react'
import Record from './components/Record'
import './styles/form.scss'

const Form = ({
  buttons,
  disableTabs,
  errorFields,
  formInputs,
  handleButtonClick,
  handleInputChange,
  handleOnBlur,
  inputValues,
  offset,
  successRecord,
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
          disableTabs={disableTabs}
        />
      </div>
      <div className='form-view'>
        <PreviewInputs
          formInputs={formInputs}
          inputValues={inputValues}
        />
      </div>
      <div className='form-view'>
        {successRecord.name
          ? <Record record={successRecord} />
          : null}
      </div>
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