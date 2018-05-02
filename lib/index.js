const pkg = require('./package.json')
const routes = require('./routes/')
const logger = require('./utils/logger')

async function register(server) {
  try {
    server.route(routes)
  } catch (e) {
    logger.error('Cannot register extensions!', e)
  }
}

module.exports = {
  pkg,
  register
}
