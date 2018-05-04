import {
  FETCHING,
  HANDLE_FETCH_ERROR,
  REQUEST
} from '../actions/types'

const initialState = {
  fetching: false
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
    case REQUEST:
      return state
    default:
      return state
  }
}

export default charactersReducer
