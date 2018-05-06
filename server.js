require('dotenv').config()
const config = require('config') 
const glue = require('glue')
const http = require('http')
const manifest = require('./manifest')
const logger = require('./lib/utils/logger')
// Create server, initialize and start it.
async function makeServer() {
  try {
    const server = await glue.compose(manifest, { relativeTo: __dirname })
    await server.start()
  } catch (e) {
    logger.error('Cannot create server.', e)
  }
}

// function keepAwake () {
//   console.log('------ keep awake ------');
//   return http.get(process.env.APP_URL);
// }

if (!module.parent) {
  makeServer()
  // if (process.env.NODE_ENV === 'production') {
  //   setInterval(function() { keepAwake() }, 300000) // every 5 minutes
  // }
}
