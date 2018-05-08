export const HANDLE_APP_ERROR = 'HANDLE_APP_ERROR'

export const handleAppError = (error) => ({
  type: HANDLE_APP_ERROR,
  payload: error
})
