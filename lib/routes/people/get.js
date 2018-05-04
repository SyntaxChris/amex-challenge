const Boom = require('boom')
const config = require('config')
const joi = require('joi')
const { Person } = require('../../models')

const validate = {
  params: {
    id: joi.number().required()
  }
}

const pre = [{
  assign: 'query',
  method (request) {
    return Person
      .findBy('id', encodeURIComponent(request.params.id))
      .then((results) => {
        return {
          count: results.length,
          items: results
        }
      })
  }
}]

async function handler(request) {
  try {
    const people = request.pre.query
    return people
  } catch (e) {
    return Boom.badImplementation(e)
  }
}

module.exports = {
  validate,
  pre,
  handler,
  description: 'Return a person with a given id'
}
