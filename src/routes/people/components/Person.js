import PersonForm from './PersonForm'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import '../../../styles/view.scss'

const Person = props => <div className='view person'> 
  <Route to='/person' render={() => <PersonForm {...props} />} />
</div>

export default Person