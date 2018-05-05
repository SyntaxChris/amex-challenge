import {
  CLEAR_FORM,
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
  isValidated: false,
  successRecord: {
    name: '',
    age: '',
    date_of_birth: '',
    email: ''
  }
}

function charactersReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_FORM:
      return initialState
    case LOADING:
      return {
        ...state,
        loading: action.payload
      }
    case HANDLE_PERSON_CREATE_ERROR:
      return state
    case HANDLE_PERSON_CREATE_SUCCESS:
      const {
        name,
        age,
        date_of_birth,
        email
      } = action.payload

      return {
        ...state,
        successRecord: {
          age,
          date_of_birth,
          email,
          name
        }
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
