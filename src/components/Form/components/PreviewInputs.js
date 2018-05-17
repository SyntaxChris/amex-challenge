import InputContainer from './InputContainer'
import PropTypes from 'prop-types'
import React from 'react'

const PreviewInputs = ({
  formFields,
  inputValues
}) => formFields.map((formInput, i) => <div
  key={i.toString()}
  className='input-container preview'
> 
  <div className='label'>{formInput.label}</div>
  <input
    readOnly={true}
    tabIndex={-1}
    value={formInput.type === 'date'
      ? `${inputValues.date_of_birth.month
          }-${inputValues.date_of_birth.day
          }-${inputValues.date_of_birth.year}`
      : inputValues[formInput.type]}
    />
</div>)

PreviewInputs.propTypes = {
  formFields: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    fields: PropTypes.arrayOf(PropTypes.shape({

    })).isRequired,
    type: PropTypes.string.isRequired
  })).isRequired,
  inputValues: PropTypes.shape({
    name: PropTypes.string,
    date: PropTypes.object,
    email:PropTypes.string
  })
}

export default PreviewInputs
