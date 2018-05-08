import CheckMark from './components/CheckMark'
import EditInputs from './components/EditInputs'
import Input from './components/Input'
import Loader from './components/Loader'
import PreviewInputs from './components/PreviewInputs'
import PropTypes from 'prop-types'
import React from 'react'
import Record from './components/Record'
import './styles/form.scss'

const Form = ({
  buttons,
  errorFields,
  formInputs,
  handleButtonClick,
  handleInputChange,
  handleOnBlur,
  inputValues,
  loading,
  offset,
  successRecord,
  title
}) => <div className='form-container'>
  {loading ? <Loader /> : null}
  <div className='form-header'>
    <div className='title'>{title}</div>
  </div>
  <form>
    <div
      className='form-scroller'
      style={{ marginLeft: `-${offset * 100}%` }}
    >
      {console.log(offset)}
      <div className='form-view'>
        <EditInputs
          errorFields={errorFields}
          formInputs={formInputs}
          handleInputChange={handleInputChange}
          handleOnBlur={handleOnBlur}
          inputValues={inputValues}
          offset={offset}
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

const formInputPropTypes = {
  label: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
}
const successRecordPropTypes = {
  date_of_birth: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired
}

Form.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired
  })).isRequired,
  errorFields: PropTypes.object,
  formInputs: PropTypes.arrayOf(PropTypes.shape(formInputPropTypes)).isRequired,
  handleButtonClick: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleOnBlur: PropTypes.func.isRequired,
  inputValues: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  offset: PropTypes.number.isRequired,
  successRecord: PropTypes.shape(successRecordPropTypes).isRequired,
  title: PropTypes.string.isRequired
}

export default Form