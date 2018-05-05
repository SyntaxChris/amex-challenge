import {
  FETCHING,
  HANDLE_FETCH_ERROR,
  HANDLE_FORM_ERRORS,
  REQUEST,
  UPDATE_FORM_FIELDS
} from '../actions/types'

const initialState = {
  fetching: false,
  formFields: {
    name: '',
    date: {
      mm: '',
      dd: '',
      yyyy: ''
    },
    email: ''
  },
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
    case UPDATE_FORM_FIELDS:
      return {
        ...state,
        formFields: {
          ...state.formFields,
          [action.payload.attr] : action.payload.val
        }
      }
    default:
      return state
  }
}

export default charactersReducer
