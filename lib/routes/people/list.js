const Boom = require('boom')
const config = require('config')
const joi = require('joi')
const { Person } = require('../../models')

const validate = {
  query: {
    page: joi.number().default(0)
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
    
    return Person
      .select('*', request.query.page)
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
