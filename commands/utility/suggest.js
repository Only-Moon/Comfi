const { db } = require('../../Database.js');
const { MessageButton } = require('discord.js');
const simplydjs = require('simply-djs-v13')
 
module.exports = {
	config: {
		name: 'suggestion',
		category: 'utility',
		description: "Suggest something to the server",
		usage: 'suggest message',
		example: 'suggest testing',
		aliases: ['suggest']
	},

	run: async (bot, message, args) => {
   
  let channel = await db.fetch(`suggestion_${message.guild.id}`);
    if (!channel) return message.channel.send(`Please set the suggestion channel first by using **Cr!set-suggestion**`);
  
  simplydjs.suggestSystem(bot, message, args, {
   chid: `${channel}`,
   embedColor: '#F8B6D4', // defaultL #075FFF
   credit: false,
   yesEmoji: '778611379560120320', // default: ☑️
   yesColor: '', // default: green 
   noEmoji: '778611410539905044', // default: X
   noColor: '', // default: red
})
  }
}