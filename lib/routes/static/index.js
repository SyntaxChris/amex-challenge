module.exports = [
  {
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: '.',
        listing: false,
        index: true,
      }
    }
  }
]
