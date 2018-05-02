const config = require('config')
const list = require('./list')

module.exports = [
  // {
  //   method: 'POST',
  //   path: `/${config.get('app.apiVersion')}/shipments`,
  //   config: create
  // },
  // {
  //   method: 'GET',
  //   path: `/${config.get('app.apiVersion')}/shipments/{id}`,
  //   config: load
  // },
  // {
  //   method: 'GET',
  //   path: `/${config.get('app.apiVersion')}/shipments/{id}.zip`,
  //   config: loadPDF
  // },
  // {
  //   method: 'PATCH',
  //   path: `/${config.get('app.apiVersion')}/shipments/{id}`,
  //   config: patch
  // },
  {
    method: 'GET',
    path: `/${config.get('app.apiVersion')}/people`,
    config: list
  }
]
