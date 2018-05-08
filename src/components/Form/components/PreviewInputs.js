import Input from './Input'
import PropTypes from 'prop-types'
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

PreviewInputs.propTypes = {
  formInputs: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.string).isRequired,
    type: PropTypes.string.isRequired
  })).isRequired,
  inputValues: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.object,
    email:PropTypes.string
  })
}

export default PreviewInputs
