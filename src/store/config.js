import { apiMiddleware } from 'redux-api-middleware'
import { compose, createStore, applyMiddleware } from 'redux'
import rootReducer from '../modules/reducers'
import thunk from 'redux-thunk'

function configureStore () {
  const middleware = [ apiMiddleware, thunk ]
  let composeEnhancers = compose

  if (process.env.NODE_ENV === 'development') {
    const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    if (typeof composeWithDevToolsExtension === 'function') {
      composeEnhancers = composeWithDevToolsExtension
    }
  }

  return createStore(
    rootReducer,
    composeEnhancers(
      applyMiddleware(...middleware)
    )
  )
}

export default configureStore
