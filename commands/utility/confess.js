const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
 
module.exports = {
	config: {
		name: 'confess',
		category: 'utility',
		description: "Confess anonymously to the server",
		usage: 'confess <message>',
		example: 'confesss I love myself',
		aliases: ['confession']
	},

	run: async (bot, message, args) => {

    message.delete();

    let channel = await db.fetch(`confession_${message.guild.id}`);
    if (channel === null) return;
  
  const confessionQuery = args.join(" ");
  if(!confessionQuery) return message.reply("Please Confess Something.");
    
  const embed = new MessageEmbed()
         
       .setTitle('Anonymous Confession')
       .setDescription(`${confessionQuery}`)
       .setColor("FFA0B3")
       .setTimestamp();
       
    
    let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)
  }
}