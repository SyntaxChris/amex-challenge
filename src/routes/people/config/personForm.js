import moment from 'moment'
// =====================

// form field components

// =====================
export const buttons = {
  newPerson: [{ label: 'Preview' }],
  previewPerson: [{ label: 'Submit' }]
}

export const formInputs = [
  {
    label: 'name',
    placeholders: ['name'],
    type: 'name'
  },
  {
    label: 'date of birth',
    placeholders: ['mm', 'dd', 'yyyy'],
    type: 'date'
  },
  {
    label: 'email',
    placeholders: ['email'],
    type: 'email'
  }
]

// ======================

// form field validations

// ======================
export function validateDate (date) {
  const dateFormat = `${date.yyyy}-${date.mm}-${date.dd}`

  if (moment(dateFormat, 'YYYY-MM-DD', true).isValid()) {
    const yearsBefore = moment().diff(dateFormat, 'years', false)
    
    if (yearsBefore < 18) {
      return 'Must be 18 or older to apply.'
    }

    if (yearsBefore > 150) {
      return 'Please tell us where the fountain of youth is.'
    }
  } else {
    return 'Please enter a valid date. ( mm-dd-yyyy )'
  }

  return ''
}

export function validateEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  return re.test(String(email).toLowerCase())
}

export function validateName (name) {
  const re = /^[a-zA-Z ]{2,50}$/
  
  return re.test(String(name))
}
