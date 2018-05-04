import {
  FETCHING,
  HANDLE_FETCH_ERROR,
  HANDLE_FORM_ERRORS,
  REQUEST
} from '../actions/types'

const initialState = {
  fetching: false,
  formFieldErrors: {}
}

function charactersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCHING:
      return {
        ...state,
        fetching: action.payload
      }
    case HANDLE_FETCH_ERROR:
      return state
    case HANDLE_FORM_ERRORS:
      return {
        ...state,
        formFieldErrors: action.payload
      }
    case REQUEST:
      return state
    default:
      return state
  }
}

export default charactersReducer
