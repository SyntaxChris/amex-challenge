import Loadable from 'react-loadable'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

const PersonRoute = Loadable({
  loader () { return import('./containers/PersonContainer') },
  loading() { return null }
})

// add all people routes here
const PeopleRoutes = () => <div className='people-container'>
  <Switch>
    <Route to='/person' render={() => <PersonRoute />} />
    <Redirect to='/person' />
  </Switch>
</div>

export default PeopleRoutes