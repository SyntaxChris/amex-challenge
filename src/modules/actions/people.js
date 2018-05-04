import { browserHistory } from 'react-router'
import { CALL_API } from 'redux-api-middleware'
import {
  FETCHING,
  HANDLE_FETCH_ERROR,
  HANDLE_FORM_ERRORS,
  REQUEST
} from './types'

export const handleFormErrors = (errorMsg) => ({
  type: HANDLE_FORM_ERRORS,
  payload: errorMsg
})
