const config = require('config')
const create = require('./create')
const get = require('./get')
const list = require('./list')

module.exports = [
  {
    method: 'GET',
    path: `/${config.get('app.apiVersion')}/people`,
    config: list
  },
  {
    method: 'GET',
    path: `/${config.get('app.apiVersion')}/people/{id}`,
    config: get
  },
  {
    method: 'POST',
    path: `/${config.get('app.apiVersion')}/people`,
    config: create
  }
]
