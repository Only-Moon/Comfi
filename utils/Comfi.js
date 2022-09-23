const Discord = require('discord.js');
const mongoose = require('mongoose');

/*
 * Comfi Bot for Discord
 * Copyright (C) 2021 Xx-Mohit-xX
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

class Comfi extends Discord.Client {
  constructor() {
    super({
      allowedMentions: {
        parse: ['users', 'roles'],
        repliedUser: false,
      },
      intents: [
        'Guilds',
        'GuildMembers',
        'GuildBans',
        'GuildInvites',
        'GuildEmojisAndStickers',
        'GuildMessages',
        'GuildMessageTyping',
        'MessageContent',
      ],
      partials: ['Message', 'Channel', 'GuildMember', 'Guild', 'User'],
      restRequestTimeout: 30000,
    });
    this.color = process.env.color || '#F4B3CA';
    this.dash = process.env.web;
    this.err_chnl = process.env.error_channel;
    this.support = process.env.support || `${this.dash}support`;
    this.login(process.env.TOKEN).then(console.log);
    this.dbs(process.env.Mongoose);
    this.init();
  }

  dbs(s) {
    mongoose
      .connect(s, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('Mongodb connected!! '))
      .catch((err) => console.error(`${err.stack}`));
  }

  init() {
    this.once('ready', () => {
    console.log("Dashboard is ready")
      require('../server')(this);
    });
  }
}

module.exports = Comfi;
