import Loadable from 'react-loadable'
import PersonForm from './components/PersonForm'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
// dynamic imports
const PersonRoute = Loadable({
  loader () { return import('./containers/PersonContainer') },
  loading() { return null }
})
const PeopleRoute = Loadable({
  loader () { return import('./containers/PeopleContainer') },
  loading() { return null }
})
// top level people routes
const PeopleRoutes = () => <section className='people-container'>
  <Switch>
    <Route path='/person' component={PersonRoute} />
    <Route path='/people' component={PeopleRoute} />
    <Redirect to='/person' />
  </Switch>
</section>

export default PeopleRoutes