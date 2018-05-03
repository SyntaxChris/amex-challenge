const Boom = require('boom')
const baseJoi = require('joi')
const dateFormatExtentions = require('joi-date-extensions')
const joi = baseJoi.extend(dateFormatExtentions) 
const { Person } = require('../../models')

const validate = {
  payload: joi.object({
    name: joi.string().min(2).max(50).required(),
    date_of_birth: joi.date().format('YYYY-MM-DD').required(),
    email: joi.string().email().required()
  })
}

const pre = [{
  method (request) {
    try {
      // find a person by email
      return Person
        .findBy('email', request.payload.email)
        .then((person) => {
          // if the record exists throw a duplication error
          if (person.length) {
            return Boom.forbidden('A person with this email already exists.')
          }

          return null
        })
    } catch (e) {
      return Boom.badImplementation(e)
    }
  }
}]

function handler (request) {
  try {
    // return person record if it passes pre handler check
    return Person
      .create(request.payload)
      .then(result => result[0])
  } catch (e) {
    return Boom.badImplementation(e)
  }
}

module.exports = {
  validate,
  pre,
  handler,
  description: 'Create a new person'
}
