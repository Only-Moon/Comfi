const discord = require
const { RichEmbed } = require("discord.js")
const moment = require("moment")
const hastebin = require('hastebin-gen');

module.exports = {
    config: {
        name: "hastebin",
        category: 'utility',
        aliases: ["haste"],
        description: "Get Link of your given Code or Text ad Hastebin",
        usage: "hastebin <code/text>",
    },
    run: async (bot, message, args) => {
      
      if(!args.join(" ")) 
      return message.channel.send(`Please write a Valid Code or Text.`); 
      
      hastebin(args.join(" "), { extension: 'rage' }).then(haste => { 
        message.channel.send(haste);
        
      }).catch(error => { message.channel.send(`\`\`\`\n-ERROR-\n\`\`\`${error}`); });
}}