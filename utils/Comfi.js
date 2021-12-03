const Discord = require('discord.js'),
    mongoose = require('mongoose'),
    chalk = require('chalk'),
    fs = require('fs');

class Comfi extends Discord.Client {
    constructor() {
        super({
            allowedMentions: { 
    parse: ['users', 'roles'],
    repliedUser: true },
           intents: [ "GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_MESSAGES", "GUILD_EMOJIS_AND_STICKERS", "GUILD_INVITES", "GUILD_MESSAGE_TYPING" ],
           partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'GUILD', 'USER'],
          restRequestTimeout: 30000
        })
        this.logger = (require('./Logger.js'))
        this.color = '#F4B3CA'
        this.error = '<a:error:890107682013474846>'
        this.tick = '<a:tick:890113862706266112>'
        this.crosss = '<a:cross:890113459868553277>'
        this.dash = 'https://comfi.xx-mohit-xx.repl.co/'
        this.ms = require("ms") 
        this.on('ready', () => {
            this.logger.ready(`Logged in as ${this.user.tag}`, 'ready')
        })
        this.owners = (require('../config.json').owners)
        this.login(process.env.TOKEN)
        this.config = require('../config.json')
        this.categories = fs.readdirSync("./commands/");
        this.dbs(process.env.Mongoose)
        this.commands = new Discord.Collection()
        this.aliases = new Discord.Collection()
        this.slashCommands = new Discord.Collection()
        this.timeout = new Discord.Collection()
        this.init()
    }
    dbs(s) {
        mongoose
            .connect(s, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }) 
            .then(() => this.logger.log('Mongodb connected!'))
            .catch((err) => this.logger.error(`${err}`)) 
    }

 init() {

require("../handler/index")(this)

}

  
}

module.exports = Comfi