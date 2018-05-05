import PersonForm from './PersonForm'
import PropTypes from 'prop-types'
import React from 'react'
import '../../../styles/view.scss'

const People = props => <div className='view people'> 
  <PersonForm {...props} />
</div>

export default People