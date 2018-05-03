const config = require('config')
const dbConfig = config.get('db')
const env = process.env.NODE_ENV || 'development'
const { client, connection } = dbConfig[env]

module.exports = require('knex')({ client, connection })