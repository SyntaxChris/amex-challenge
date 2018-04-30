const dbConfig = require('../knexfile')
const { client, connection } = dbConfig.development

module.exports = require('knex')({ client, connection })