const Boom = require('boom')
const Path = require('path')

module.exports = {
  server: {
    port: process.env.PORT || 8000,
    routes: {
      cors: true,
      files: {
        relativeTo: Path.join(__dirname, './dist')
      },
      validate: {
        failAction: async (request, h, err) => {
          if (process.env.NODE_ENV === 'production') {
            console.error('ValidationError:', err.message)
            throw Boom.badRequest('Invalid request payload input')
          } else {
            console.error(err)
            throw err
          }
        }
      }
    }
  },

  register: {
    plugins: [
      { plugin: 'inert' },
      { plugin: './lib' },
      { plugin: 'blipp' },
      {
        plugin: 'good',
        options: {
          ops: {
            interval: 1000
          },
          reporters: {
            console: [
              {
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [
                  {
                    log: '*',
                    error: '*',
                    request: '*',
                    response: '*'
                  }
                ]
              },
              {
                module: 'good-console'
              },
              'stdout'
            ]
          }
        }
      }
    ]
  }
}
