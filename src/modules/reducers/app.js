import { HANDLE_APP_ERROR } from '../actions/app'

const initialState = {
  error: ''
}

function charactersReducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_APP_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default charactersReducer
