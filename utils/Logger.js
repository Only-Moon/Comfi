const chalk = require('chalk');
const Discord = require('discord.js')
const moment = require('moment'); 
const log = require('simple-node-logger').createRollingFileLogger({ 		
  logDirectory: './utils/logs', 		
  fileNamePattern: 'roll-<DATE>.log', 		
  dateFormat: 'YYYY.MM.DD', 	
}); 
const bot = require(`../index`)
// LOGGERS 
exports.log = (content, type = 'log') => { 	
  if (content == 'error') return; 	
  const timestamp = `[${moment().format('HH:mm:ss:SSS')}]:`; 	
  switch (type) { 	
    case 'log': 		
      log.info(content); 		
      console.log(`${chalk.bgGreen(type.toUpperCase())} ${content} `); 		
        break; 	
    case 'warn': 		
      log.warn(content); 		
      console.log(`${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `); 		
      break; 	
    case 'error': 		
      log.error(content); 		
      console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())} ${content} `); 		
      break; 	
    case 'debug': 		
      log.debug(content); 		
      console.log(`${timestamp} ${chalk.green(type.toUpperCase())} ${content} `); 		
      break; 	
    case 'cmd': 		
      log.info(content); 		
      console.log(`${chalk.black.bgWhite(type.toUpperCase())} ${content}`); 		
      break; 	
    case 'ready': 		
      log.info(content); 		
      console.log(`${chalk.black.bgBlue(type.toUpperCase())} ${content}`);
      break; 	
    default: 		
      break; 	
  }
}; 

// EXPORTS LOGGER 
exports.warn = (bot) => this.log(bot, 'warn');
exports.error = (bot) => this.log(bot, 'error');
exports.debug = (bot) => this.log(bot, 'debug');
exports.cmd = (bot) => this.log(bot, 'cmd'); 
exports.ready = (bot) => this.log(bot, 'ready');