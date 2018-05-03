const Boom = require('boom')
const joi = require('joi')
const { Person } = require('../../models')

const validate = {
  // payload: {
  //   person: joi
  //     .array()
  //     .items(joi.string().regex(/\/batches\/[0-9a-fA-F]{24}$/))
  //     .required(),
  //   fulfillmentLocation: joi
  //     .string()
  //     .valid(FULFILLMENT_LOCATIONS)
  //     .required()
  // }
}

const pre = [
  // {
  //   async method(request) {
  //     try {
  //       const shipment = await Shipment.findOne({
  //         status: DEFAULT_STATUS,
  //         fulfillmentLocation: request.payload.fulfillmentLocation
  //       })

  //       if (shipment) {
  //         return Boom.forbidden('A current shipment for this fulfillment location is already present.')
  //       }

  //       return null
  //     } catch (e) {
  //       return Boom.badImplementation(e)
  //     }
  //   }
  // }
]

async function handler (request) {
  try {
    // const shipment = new Shipment({ fulfillmentLocation: request.payload.fulfillmentLocation })
    // Shipment.convertToBatchIds(request.payload.batches).forEach(batchId => {
    //   shipment.addBatch(batchId)
    // })
    // await shipment.save()
    // return shipment
    console.log('REQUEST PAYLOAD:::::', request.payload)
    return {
      response: 'success',
      person: {
        id: 1,
        name: 'blah blah',
        age: 32,
        email: 'bblah@gmail.com',
        date_of_birth: '1996-03-27T05:00:00.000Z',
        created_at: '2018-05-01T02:22:08.000Z'
      }
    }
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
