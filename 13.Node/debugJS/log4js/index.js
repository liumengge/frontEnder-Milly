var log4js = require('log4js')

log4js.configure({
  appenders: {
    cheese: {
      type: 'file',
      filename: '13.Node/debugJS/log4js/cheese.log'
    }
  },
  categories: {
    default: {
      appenders: ['cheese'],
      level: 'trace'
    }
  }
})

var logger = log4js.getLogger('cheese')
logger.trace('Entering cheese testing')
logger.debug('Got cheese')
logger.info('Cheese is Great')
logger.warn('Cheese is warning')
logger.error('Cheese is too ripe!')
logger.fatal('Cheese was breeding ground for listeria.')