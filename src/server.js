const Hapi = require('hapi')
const Knex = require('./knex')
const server = Hapi.server({
  port: 3000,
  host: 'localhost'
})

// --------------
// Initialize
// --------------
const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`)
}

process.on('unhandledRejection', (err) => {
  console.log(err)
  process.exit(1)
})

// --------------
// Routes
// --------------
server.route({
  path: '/people',
  method: 'GET',
  handler: (request, reply) => {
    return Knex('people')
      .select('*')
      .limit(10)
      .then((results) => {
        if(!results || results.length === 0) {
          return {
            error: true,
            errMessage: 'no people found'
          }
        }

        return {
          dataCount: results.length,
          data: results
        }
      })
      .catch((err) => 'server-side error')
  }
})

if (!module.parent) {
  init()
}