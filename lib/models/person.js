const config = require('config')
const knex = require('../utils/knex')

class Person {
  find (query, page=0) {
    return knex('people')
      .select(query)
      .limit(config.get('app.defaultQueryLimit'))
      .offset(page)
  }

  findById (id) {
    return knex('people').where('id', id)
  }
}

module.exports = new Person()
