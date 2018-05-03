const config = require('config')
const knex = require('../utils/knex')
const moment = require('moment')

class Person {
  constructor () {
    this.table = 'people'
    this.limit = config.get('app.defaultQueryLimit')
  }

  create (data) {
    // time now
    const dateNow = moment()
    // time of birth
    const dateOfBirth = moment(data.date_of_birth)
    // age calculation
    const age = dateNow.diff(dateOfBirth, 'years', false)
    // new data record with calculated age
    const personRecord = { ...data, age }
    // insert record and return record by id
    return knex(this.table)
      .insert(personRecord)
      .then(result => this.findBy('id', result[0]))
  }

  select (query, offset=0) {
    // find by select query with offset and limit
    return knex(this.table)
      .select(query)
      .limit(this.limit)
      .offset(this.limit * offset)
  }

  findBy (attr, value) {
    // find by attribute
    return knex(this.table)
      .where(attr, value)
  }
}

module.exports = new Person()
