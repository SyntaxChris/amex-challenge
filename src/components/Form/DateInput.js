import _ from 'lodash'
import React from 'react'

// date input component
const DateInput = ({
  action,
  errorFields,
  inputValues,
  label,
  placeholders,
  type
}) => <div
  className={`input-container date${_.includes(errorFields, label) ? ' error' : ''}`}
>
  <div className='label'>{label}</div>
  {placeholders.map((placeholder, i) => <input
    key={i.toString()}
    onChange={(e) => action(e.target.value, type, placeholder)}
    placeholder={placeholder}
    type='text'
    value={inputValues[placeholder]}
  />)}
</div>

export default DateInput