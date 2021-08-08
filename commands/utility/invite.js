const { Client, Message, MessageEmbed, Discord, MessageButton } = require('discord.js');

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
    .setStyle("SUCCESS") 
    .setLabel("Sure!") 
    .setCustomId("inviteyes"); 
    
    
    const no = new MessageButton() 
    .setStyle("DANGER") 
    .setLabel('Nope!') 
    .setCustomId('inviteno') 
    
    
    message.channel.send({content: `<@${message.author.id}>`,
      embeds: embed })
    }
    
  }