import {
  HANDLE_PERSON_CREATE_ERROR,
  HANDLE_PERSON_CREATE_SUCCESS,
  HANDLE_FORM_ERRORS,
  LOADING,
  REQUEST,
  UPDATE_FORM_FIELDS,
  VALIDATE_FORM
} from '../actions/types'

const initialState = {
  loading: false,
  formFields: {
    name: '',
    date: {
      mm: '',
      dd: '',
      yyyy: ''
    },
    email: ''
  },
  formFieldErrors: {},
  isValidated: false
}

function charactersReducer(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case HANDLE_PERSON_CREATE_ERROR:
      console.log('err', action.payload)
      return state
    case HANDLE_PERSON_CREATE_SUCCESS:
      console.log('success', action.payload)
      return {
        ...state
      }
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
    case VALIDATE_FORM:
      return {
        ...state,
        isValidated: action.payload
      }
    default:
      return state
  }
}

export default charactersReducer
