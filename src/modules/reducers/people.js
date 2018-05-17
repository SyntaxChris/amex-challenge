import {
  CLEAR_FORM,
  HANDLE_PERSON_CREATE_ERROR,
  HANDLE_PERSON_CREATE_SUCCESS,
  LOADING,
  REQUEST,
  UPDATE_FORM_FIELDS,
} from '../actions/people'

const initialState = {
  loading: false,
  formFields: {
    name: '',
    date_of_birth: {
      month: '',
      day: '',
      year: ''
    },
    email: ''
  },
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
    default:
      return state
  }
}

export default charactersReducer
