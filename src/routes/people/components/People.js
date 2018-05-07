import PersonForm from './PersonForm'
import React from 'react'
import '../../../styles/view.scss'

// view wrapper for people route
const People = props => <div className='view people'> 
  <PersonForm {...props} />
</div>

export default People