const ansi = require('ansi')
var cursor = ansi(process.stdout)

module.exports = {
  extends: ['router', 'log', 'info', 'warn', 'error'],

  router: (sender, route, context, params) => {
    // Could be used for route metrics.
  },

  log: function(sender, message) {
    if (typeof message == 'string')
      return console.log(message)

    if (sender.type !== 'protocol' || sender.name !== 'express')
      return console.log(message)

    const req = message

    cursor
      .hex('#2EAEBB').write(`[${req.method}]`)
      .hex('#D35003').write(` ${req.url}\r\n`).reset()
  },

  info: function(sender, message) {

  },

  warn: function(sender, message) {

  },

  error: function(sender, message) {

  },
}

// IMPORTANT: Loggers should be used with caution as they can leak sensitive information about your application stack.
