import {
  FETCHING,
  HANDLE_FORM_ERRORS,
  REQUEST
} from './types'

export const handleFormError = (errorMsg) => ({
  type: HANDLE_FORM_ERRORS,
  payload: errorMsg
})
