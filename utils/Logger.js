const chalk = require('chalk');
const Discord = require('discord.js');
const moment = require('moment');
const log = require('simple-node-logger').createRollingFileLogger({
  logDirectory: './utils/logs',
  fileNamePattern: 'roll-<DATE>.log',
  dateFormat: 'YYYY.MM.DD',
});

const bot = require('../index');

/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

// LOGGERS
exports.log = (content, type = 'log') => {
  if (content === 'error') return;
  const timestamp = `[${moment().format('HH:mm:ss:SSS')}]:`;
  switch (type) {
    case 'log':
      log.info(content);
      console.log(`${chalk.bgGreen(type.toUpperCase())} ${content} `);
      break;
    case 'warn':
      log.warn(content);
      console.log(
        `${timestamp} ${chalk.black.bgYellow(type.toUpperCase())} ${content} `,
      );
      break;
    case 'error':
      log.error(content);
      console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())}`);
      console.log(content)
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
    case 'table':
      log.info(content);
      console.log(`${timestamp} ${chalk.bgGreen(type.toUpperCase())}`);
      console.table(content);
      break;
    case 'limit':
      log.error(content);

      console.log(`${timestamp} ${chalk.bgRed(type.toUpperCase())}`);
      console.log(content);
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
exports.table = (bot) => this.log(bot, 'table');
exports.limit = (bot) => this.log(bot, 'limit');
exports.ready = (bot) => this.log(bot, 'ready');
