import App from './components/App'
import React from 'react'
import ReactDOM from 'react-dom'

const MOUNT_NODE = document.getElementById('root')
const render = () => ReactDOM.render(<App />, MOUNT_NODE)

MOUNT_NODE ? render() : null
