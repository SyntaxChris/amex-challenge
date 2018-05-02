const config = require('config')
const request = require('got')
const chalk = require('chalk')
const env = process.env.NODE_ENV || 'development'

function formatSlackMessage(message) {
  const date = new Date()
  let str = env === 'production' ? '<!here>:\n' : ''
  str += `*${date}* in _${env.toUpperCase()}_ environment`
  str += `\n\`\`\`${message}\`\`\``
  return str
}

async function postToSlackWebhook(text, done) {
  // try {
  //   await request.post(config.get('slack.apiURL'), {
  //     json: true,
  //     body: {
  //       text: formatSlackMessage(text)
  //     }
  //   })
  // } catch (e) {
  //   console.log('Error posting to slack')
  // }
}

function log(message) {
  console.log()
  console.log(chalk.cyanBright('δ.'), message, chalk.cyanBright('☯︎'))
}

class Logger {
  info(message) {
    log(chalk.blue(message))
    console.log()
  }

  success(message) {
    log(chalk.green(message))
    console.log()
  }

  error(message, e) {
    log(chalk.red(message))
    if (e) {
      postToSlackWebhook(`${message}.\n${e}`)
      console.log('•→', e)
    }
    console.log()
  }
}

module.exports = new Logger()
