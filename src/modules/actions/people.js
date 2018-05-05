import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'
import {
  FETCHING,
  HANDLE_FETCH_ERROR,
  HANDLE_FORM_ERRORS,
  REQUEST,
  UPDATE_FORM_FIELDS
} from './types'

export const handleFormErrors = (errorMsg) => ({
  type: HANDLE_FORM_ERRORS,
  payload: errorMsg
})

export const updateFormField = (attr, val) => ({
  type: UPDATE_FORM_FIELDS,
  payload: { attr, val }
})
