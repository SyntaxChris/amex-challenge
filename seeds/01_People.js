const _ = require('lodash')
const faker = require('faker')
const moment = require('moment')

exports.seed = (knex, Promise) => {
  // delete existing entries
  return knex('people').del()
    .then(() => {
      const seedPeople = _.times(300, () => {
        // time now
        const dateNow = moment()
        // random time of birth no more than 100 years ago
        const dateOfBirth = moment()
          .subtract(Math.floor((Math.random() * 100) + 1), 'year')
          .subtract(Math.floor((Math.random() * 100) + 1), 'day')
        
        return {
          name: faker.fake('{{name.firstName}} {{name.lastName}}'),
          age: dateNow.diff(dateOfBirth, 'years', false),
          date_of_birth: moment(dateOfBirth).format('YYYY-MM-DD'),
          email: faker.fake('{{internet.email}}'),
        }
      })
      // insert seed entries
      return knex('people').insert(seedPeople)
    })
}