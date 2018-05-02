const dbConfig = require('../../knexfile')
const env = process.env.NODE_ENV || 'development'
const { client, connection } = dbConfig[env]

module.exports = require('knex')({ client, connection })