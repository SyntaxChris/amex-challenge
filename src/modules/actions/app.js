import {
  HANDLE_APP_ERROR
} from './types'

export const handleAppError = (error) => ({
  type: HANDLE_APP_ERROR,
  payload: error
})
