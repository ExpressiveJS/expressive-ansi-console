'use strict'

const ansi = require('ansi')
var cursor = ansi(process.stdout)

module.exports = {
  extends: ['router', 'log', 'info', 'warn', 'error', 'debug'],

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

  info: function(sender, ...args) {
    return console.info.apply(this, args)
  },

  warn: function(sender, ...args) {
    return console.warn.apply(this, args)
  },

  error: function(sender, ...args) {
    return console.error.apply(this, args)
  },

  debug: function(sender, ...args) {
    return console.debug.apply(this, args)
  },
}

// IMPORTANT: Loggers should be used with caution as they can leak sensitive information about your application stack.
