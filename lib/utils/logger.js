const config = require('config')
const request = require('got')
const chalk = require('chalk')
const env = process.env.NODE_ENV || 'development'

function log(message) {
  console.log(chalk.cyanBright('δ.'), message, chalk.cyanBright('☯︎'))
}

class Logger {
  info(message) {
    log(chalk.blue(message))
  }

  success(message) {
    log(chalk.green(message))
  }

  error(message, e) {
    log(chalk.red(message))
    if (e) {
      console.log('•→', e)
    }
  }
}

module.exports = new Logger()
