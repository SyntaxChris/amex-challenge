module.exports = [
  {
    method: 'GET',
    path: '/{path*}',
    handler: {
      directory: {
        path: '.',
        redirectToSlash: true,
        index: ['index.html']
      }
    }
  }
]
