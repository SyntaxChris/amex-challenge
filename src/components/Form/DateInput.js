import _ from 'lodash'
import React from 'react'

// date input component
const DateInput = ({
  action,
  errorMessage,
  inputValues,
  label,
  placeholders,
  type
}) => <div
  className={`input-container date${errorMessage ? ' error' : ''}`}
>
  <div className='label'>{label}</div>
  {placeholders.map((placeholder, i) => <input
    key={i.toString()}
    onChange={(e) => action(e.target.value, type, placeholder)}
    placeholder={placeholder}
    name={placeholder}
    type='text'
    value={inputValues[placeholder]}
  />)}
</div>

export default DateInput