const Boom = require('boom')
const config = require('config')
const joi = require('joi')
const { Person } = require('../../models')

const validate = {
  query: {
    offset: joi.number().default(0)
  }
}

const pre = [
  {
    assign: 'query',
    method (request) {
      // fetch total count
      return Person.count()
    }
  }
]

async function handler(request) {
  try {
    const total = Object.values(request.pre.query[0])[0]
    console.log('REQUEST', request.query)
    return Person
      .select('*', request.query.offset)
      .then((res) => {
        return { total, items: res }
      })
  } catch (e) {
    return Boom.badImplementation(e)
  }
}

module.exports = {
  validate,
  pre,
  handler,
  description: 'Return list of people'
}
