import moment from 'moment'

export const formInputs = [
  {
    label: 'name',
    fields: ['name'],
    type: 'name'
  },
  {
    label: 'date of birth',
    fields: ['mm', 'dd', 'yyyy'],
    type: 'date'
  },
  {
    label: 'email',
    fields: ['email'],
    type: 'email'
  }
]

export const formViews = {
  new: {
    buttons: [{ label: 'Preview' }],
    offset: 0,
    title: 'NEW PERSON'
  },
  preview: {
    buttons: [{ label: 'Back' }, { label: 'Submit' }],
    offset: 1,
    title: 'PREVIEW'
  },
  submitted: {
    buttons: [{ label: 'Back' }],
    offset: 2,
    title: 'SUCCESS'
  }
}

// ======================
// form field validations
// ======================
export function isValidDate (date) {
  const dateFormat = `${date.yyyy}-${date.mm}-${date.dd}`

  if (moment(dateFormat, 'YYYY-MM-DD', true).isValid()) {
    const yearsBefore = moment().diff(dateFormat, 'years', false)

    if (yearsBefore < 18) {
      if (yearsBefore < 0) {
        return 'Wow, someone from the future!'
      }
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

export function isValidEmail (email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  
  return re.test(String(email).toLowerCase())
}

export function isValidName (name) {
  const re = /^[a-zA-Z ]{2,50}$/
  
  return re.test(String(name))
}
