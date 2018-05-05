import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import configureStore from '../store/config'
import Header from './Header'
import { Provider } from 'react-redux'
import React, { Component } from 'react'
import PeopleRoute from '../routes/people'
import PreviewRoute from '../routes/preview'
import '../styles/application.scss'

// initialize store
const store = configureStore()

// top level routes
const AppRoutes = ({ animate }) => <BrowserRouter>
  <Switch>
    <Route
      path='/new-person'
      render={()=> <PeopleRoute title={'New Person'} />}
    />
    <Route
      path='/preview-person'
      render={()=> <PeopleRoute preview={true} title={'Preview'} />}
    />
    <Redirect to='/new-person' />
  </Switch>
</BrowserRouter>

// parent component
class App extends Component {
  render () {
    return <Provider store={store}>
      <div className='amex-challenge' style={{ height: '100%' }}>
        <Header />
        <AppRoutes />
      </div>
    </Provider>
  }
}

export default App
