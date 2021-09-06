const bot = require("../index");
const { MessageEmbed } = require('discord.js');
const { db } = require('../Database')
const simplydjs = require('simply-djs')

bot.on("messageCreate", async (message) => {

  let disabled = new MessageEmbed()		
  .setTitle('Chatbot Error')
  .setColor('#F4B3CA')		
  .setDescription('Chat Bot is disabled by the Owner in this Server!')		
  .setFooter(`Requested by ${message.author.username}`);

  
let ch = await db.get(`chatbt_${message.guild.id}`)
  
  if (!ch || ch === undefined) return;
  
  if(message.channel.id === ch) {
let toggle = await db.get(`chattgl_${message.guild.id}`);

	if(toggle.toString() === `true`){ 

  simplydjs.chatbot(bot, message, {
    chid: `${ch}`,
    name: 'Comfi', // default: Your bot na
    developer: `Moonbow and ImRopoxPro`,
  })
} else if(!toggle || toggle.toString() === 'false') return message.delete(), message.author.send({embeds: [ disabled ]})
  }
})