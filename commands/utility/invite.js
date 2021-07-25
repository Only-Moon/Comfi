const { Client, Message, MessageEmbed, Discord } = require('discord.js');
  const { MessageButton } = require('discord-buttons');

module.exports = {
  config: {
  name: "invite",
  aliases: ["invitlink"],
  category: "utility",
  description: "Give You My Invite Link",
  usage: "invite",
  },
  run: async (bot, message, args) => {
  const embed = new MessageEmbed() 
    .setTitle('Hello!') 
    .setDescription('⚠ | Do You Wan\'t To Invite Me?') 
    .setColor("YELLOW"); 
    
    
    const yes = new MessageButton() 
    .setStyle("green") 
    .setLabel("Sure!") 
    .setID("inviteyes"); 
    
    
    const no = new MessageButton() 
    .setStyle("red") 
    .setLabel('Nope!') 
    .setID('inviteno') 
    
    
    message.channel.send(`<@${message.author.id}>`, { 
      buttons: 
      [yes, no], 
      embed: embed })
    }
    
  }