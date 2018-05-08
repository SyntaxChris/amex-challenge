import { apiConfig } from '../../../config/api'
import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'

export const CLEAR_FORM = 'CLEAR_FORM'
export const LOADING = 'LOADING'
export const HANDLE_PERSON_CREATE_ERROR = 'HANDLE_PERSON_CREATE_ERROR'
export const HANDLE_PERSON_CREATE_SUCCESS = 'HANDLE_PERSON_CREATE_SUCCESS'
export const REQUEST = 'REQUEST'
export const UPDATE_FORM_FIELDS = 'UPDATE_FORM_FIELDS'

export const clearForm = () => ({
  type: CLEAR_FORM,
  payload: null
})

export const showLoader = loading => ({
  type: LOADING,
  payload: loading
})

export const updateFormField = (attr, val) => ({
  type: UPDATE_FORM_FIELDS,
  payload: { attr, val }
})

export const createPerson = (payload, history) => dispatch => {
  return dispatch({
    [CALL_API]: {
      endpoint: `${apiConfig[process.env.NODE_ENV]}/people`,
      method: 'POST',
      body: JSON.stringify({
        name: payload.name,
        date_of_birth: payload.date_of_birth,
        email: payload.email
      }),
      types: [REQUEST, HANDLE_PERSON_CREATE_SUCCESS, HANDLE_PERSON_CREATE_ERROR]
    }
  })
}