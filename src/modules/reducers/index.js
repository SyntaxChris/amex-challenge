import { combineReducers } from 'redux'
import app from './app'
import people from './people'

const rootReducer = combineReducers({ app, people })

export default rootReducer