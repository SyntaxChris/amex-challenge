import configureStore from './store/config'
import Header from './components/Header'
import PeopleRoutes from './routes/people'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import './styles/application.scss'

window.onload = function () {
  window.addEventListener('message', function (e) {
    if (e.data) {
      console.log(e.origin)
      // const data = JSON.parse(e.data)
      // console.log(data)
    }
  })
}


// initialize store
const store = configureStore()

// top level routes
const AppRoutes = () => <Router>
  <Route path='/' component={PeopleRoutes} />
</Router>

// parent component
class App extends Component {

  render () {
    return <Provider store={store}>
      <div className='amex-person-form' style={{ height: '100%' }}>
        <Header />
        <AppRoutes />
      </div>
    </Provider>
  }
}

const MOUNT_NODE = document.getElementById('root')
const render = () => ReactDOM.render(<App />, MOUNT_NODE)

MOUNT_NODE ? render() : null
