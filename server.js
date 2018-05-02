const config = require('config')
const glue = require('glue')
// const mongoose = require('mongoose')

const manifest = require('./manifest')
const logger = require('./lib/utils/logger')

/**
 * Create server, initialize and start it.
 */
async function makeServer() {
  try {
    logger.info(`DB connected to ${config.get('db.uri')}`)
  } catch (e) {
    logger.error('Cannot connect to db')
  }

  try {
    const server = await glue.compose(manifest, { relativeTo: __dirname })
    await server.start()
  } catch (e) {
    logger.error('Cannot create server.', e)
  }
}

if (!module.parent) {
  makeServer()
}
