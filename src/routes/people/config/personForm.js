import moment from 'moment'
// =====================

// form field components

// =====================
export const buttons = [
  { label: 'preview' },
  // { label: 'back' },
  // { label: 'next' }
]

export const formInputs = [
  {
    label: 'name',
    placeholder: 'name',
    type: 'text'
  },
  {
    label: 'date of birth',
    placeholders: ['mm', 'dd', 'yyyy'],
    type: 'date' // type date will render a different form input
  },
  {
    label: 'email',
    placeholder: 'email',
    type: 'email'
  }
]

// ======================

// form field validations

// ======================
export function validateDate (date) {
  const dateFormat = `${date.yyyy}-${date.mm}-${date.dd}`
  let errorMessage = ''

  if (moment(dateFormat).isValid()) {
    const yearsBefore = moment().diff(dateFormat, 'years', false)
    
    if (yearsBefore < 18) {
      errorMessage = 'Must be 18 or over to apply.'
    }

    if (yearsBefore > 150) {
      errorMessage = 'Please tell us where the fountain of youth is.'
    }
  } else {
    errorMessage = 'Please enter a valid date of birth.'
  }

  return errorMessage
}

export function validateEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  return re.test(String(email).toLowerCase())
}

export function validateName (name) {
  const re = /^[a-zA-Z ]{2,50}$/
  
  return re.test(String(name))
}
