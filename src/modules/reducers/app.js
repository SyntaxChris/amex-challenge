import {
  HANDLE_FORM_ERRORS
} from '../actions/types'

const initialState = {
  errorMessages: []
}

function charactersReducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_FORM_ERRORS:
      return {
        ...state,
        errorMessages: [
          ...state.errorMessages,
          action.payload
        ]
      }
    default:
      return state
  }
}

export default charactersReducer
