import PersonForm from './PersonForm'
import PropTypes from 'prop-types'
import React from 'react'
import '../../../styles/view.scss'

const People = ({
  formFields,
  formFieldErrors,
  handleFormErrors,
  preview,
  title,
  updateFormField
}) => <div
  className='view people'
> 
  <PersonForm
    formFields={formFields}
    formFieldErrors={formFieldErrors}
    handleFormErrors={handleFormErrors}
    preview={preview}
    title={title}
    updateFormField={updateFormField}
  />
</div>

export default People