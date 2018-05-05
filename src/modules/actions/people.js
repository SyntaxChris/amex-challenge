import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'
import {
  HANDLE_FETCH_ERROR,
  HANDLE_FORM_ERRORS,
  LOADING,
  HANDLE_PERSON_CREATE_ERROR,
  HANDLE_PERSON_CREATE_SUCCESS,
  REQUEST,
  UPDATE_FORM_FIELDS,
  VALIDATE_FORM
} from './types'

export const loading = loading => ({
  type: LOADING,
  payload: loading
})

export const handleFormErrors = (errorMsg) => ({
  type: HANDLE_FORM_ERRORS,
  payload: errorMsg
})

export const updateFormField = (attr, val) => ({
  type: UPDATE_FORM_FIELDS,
  payload: { attr, val }
})

export const validateForm = (validate) => ({
  type: VALIDATE_FORM,
  payload: validate
})

export const createPerson = (payload, history) => dispatch => {
  return dispatch({
    [CALL_API]: {
      endpoint: `http://127.0.0.1:8000/v1.0/people`,
      method: 'POST',
      body: JSON.stringify({
        name: payload.name,
        date_of_birth: payload.date_of_birth,
        email: payload.email
      }),
      types: [REQUEST, HANDLE_PERSON_CREATE_SUCCESS, HANDLE_PERSON_CREATE_ERROR]
    }
  })
  // .then(res => {
  //   console.log('RESPONSE', res)
  //   if (res.payload.id) {
  //     return history.push('/success')
  //   }

  // })
}