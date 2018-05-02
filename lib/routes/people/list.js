const Boom = require('boom')
const config = require('config')
const joi = require('joi')
const { Person } = require('../../models')
// const knex = require('../../utils/knex')
// const { Shipment } = require('../../models')

const validate = {
  // query: {
  //   fulfillmentLocation: joi.string().valid(FULFILLMENT_LOCATIONS),
  //   status: joi.string().valid(Object.values(statuses)),
  //   skip: joi.number().default(0),
  //   limit: joi
  //     .number()
  //     .min(1)
  //     .max(config.get('app.maxQueryLimit'))
  //     .default(config.get('app.defaultQueryLimit'))
  // }
}

const pre = [
  {
    assign: 'query',
    method (request) {
      Person.select('*').then((results) => {
        return {
          dataCount: results.length,
          data: results
        }
      })
    }
  }
]

async function handler(request) {
  try {
    return request.pre.query
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
