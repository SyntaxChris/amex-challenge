import PersonForm from './PersonForm'
import PropTypes from 'prop-types'
import React from 'react'
import '../styles/view.scss'

const People = ({ handleFormError }) => <div className='view people'>
  <PersonForm handleFormError={handleFormError} />
</div>

export default People