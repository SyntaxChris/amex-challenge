const config = require('config')
const knex = require('../utils/knex')

class Person {
  select (query, offset=0) {
    return knex('people')
      .select(query)
      .limit(config.get('app.defaultQueryLimit'))
      .offset(offset)
  }
}

module.exports = new Person
