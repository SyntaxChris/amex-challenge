// const Boom = require('boom')
// const joi = require('joi')

// const { Shipment } = require('../../models')
// // const shipmentJob = require('../../jobs/shipments')
// const loadHandler = require('./load').handler

// const validate = {
//   params: {
//     id: joi
//       .string()
//       .hex()
//       .length(24)
//       .required()
//   },

//   payload: {
//     op: joi
//       .string()
//       .valid('add', 'remove', 'replace')
//       .required(),
//     path: joi
//       .string()
//       .valid('status', 'batches')
//       .required(),
//     value: joi
//       .when('path', {
//         is: 'status',
//         then: joi.string().valid('submitted')
//       })
//       .when('path', {
//         is: 'batches',
//         then: joi
//           .array()
//           .items(joi.string().regex(/\/batches\/[0-9a-fA-F]{24}$/))
//           .min(1)
//           .required()
//       })
//   }
// }

// function createNewCurrentShipment(fulfillmentLocation) {
//   const newShipment = new Shipment({ fulfillmentLocation })
//   return newShipment.save()
// }

// const pre = [
//   {
//     assign: 'shipment',
//     method: loadHandler
//   },

//   {
//     method: function checkIfShipmentInModifiableState(request) {
//       const { shipment } = request.pre
//       if (shipment.status !== Shipment.DEFAULT_STATUS) {
//         return Boom.forbidden('Shipment cannot be modified at this time!')
//       }

//       return null
//     }
//   },

//   {
//     method: async function updateShipmentStatus(request) {
//       const { shipment } = request.pre
//       const { op, path } = request.payload
//       const isStatusUpdate = op === 'replace' && path === 'status'
//       if (!isStatusUpdate) {
//         return null
//       }

//       if (shipment.isEmpty()) {
//         return Boom.expectationFailed('Cannot submit a shipment with no batches.')
//       }

//       switch (shipment.status) {
//         case 'submission-pending':
//           return Boom.expectationFailed('Shipment is being submitted and PDF is being generated.')

//         case 'submitted':
//           return Boom.expectationFailed('Shipment has already been submitted')

//         default:
//       }

//       try {
//         shipment.changeStatusTo('submission-pending')
//         await shipment.save()

//         // shipmentJob.generatePDF({ shipmentId: shipment._id })
//         await createNewCurrentShipment(shipment.fulfillmentLocation)
//       } catch (e) {
//         return Boom.badImplementation(e)
//       }

//       return null
//     }
//   },

//   {
//     method: function addBatchesOperation(request) {
//       const { op, path, value } = request.payload
//       const isAddBatchesOp = op === 'add' && path === 'batches'
//       if (!isAddBatchesOp) {
//         return null
//       }

//       const batchIds = Shipment.convertToBatchIds(value)
//       batchIds.forEach(batchId => {
//         request.pre.shipment.addBatch(batchId)
//       })

//       request.pre.shipment.markModified(path)
//       return null
//     }
//   },

//   {
//     method: function removeBatchesOperation(request) {
//       const { op, path, value } = request.payload
//       const isRemoveBatchesOp = op === 'remove' && path === 'batches'
//       if (!isRemoveBatchesOp) {
//         return null
//       }

//       try {
//         const { shipment } = request.pre
//         const batchIds = Shipment.convertToBatchIds(value)
//         batchIds.forEach(batchId => {
//           const batchIndex = shipment.batchIndex(batchId)
//           if (batchIndex < 0) {
//             throw new Boom(`Batch '${batchId}' is not included in the shipment!`, {
//               statusCode: 404
//             })
//           }

//           const batch = shipment.batches[batchIndex]
//           if (batch.quantity <= 1) {
//             shipment.batches.splice(batchIndex, 1)
//           } else {
//             shipment.batches[batchIndex].quantity -= 1
//           }
//         })

//         shipment.markModified(path)
//         return null
//       } catch (e) {
//         return e
//       }
//     }
//   }
// ]

// async function handler(request) {
//   const { shipment } = request.pre
//   try {
//     await shipment.save()
//     return shipment
//   } catch (e) {
//     return Boom.badImplementation(e)
//   }
// }

// module.exports = {
//   validate,
//   pre,
//   handler,
//   description: 'Patch/update a shipment'
// }
