const Discord = require("discord.js")
const shorten = require('isgd')
const { PREFIX } = require("../../config.js");
const { MessageButton, default: discordButtons, MessageActionRow } = require('discord-buttons')


module.exports = {
    config: {
        name: "linkshorten",
        description: "Shows Uptime of bot",
        aliases: ["shorten"],
        category: "utility",
        example: `${prefix}linkshorten https://discord.gg/RWSEj6JrjJ blob_lab`,
        usage: "Shortens your URL to is.gd format !!",
    },
    run: async (bot, message, args) => {

        if(!args[0]) {
  message.channel.send('Please provide a link')
} else {
  shorten.shorten(args[0], function(res) { 
  
    const urldone = new Discord.MessageEmbed()
    .setColor('BLACK')
    .setTitle('Your shortened URL')
    .setDescription(`Your url is: **${res}**\n You can simply click the button below`)
  

  const url_button = new MessageButton()
    .setStyle('url')
    .setLabel(`go to ${res}`)
    .setURL(`${res}`)
    .setEmoji('🤖')
  
  
    message.channel.send(urldone, url_button)
      }
)}
}}