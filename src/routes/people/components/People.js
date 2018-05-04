import PersonForm from './PersonForm'
import PropTypes from 'prop-types'
import React from 'react'
import '../styles/view.scss'

const People = ({ formFieldErrors, handleFormErrors }) => <div
  className='view people'
> 
  <PersonForm
    formFieldErrors={formFieldErrors}
    handleFormErrors={handleFormErrors}
  />
</div>

export default People