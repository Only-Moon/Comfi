const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const { success, error } = require("../../emojis.json")
 
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
    if (channel === null) return;
  
  const suggestionQuery = args.join(" ");
  if(!suggestionQuery) return message.reply("Please Suggest Something.");
    
  const embed = new MessageEmbed()
         
       .setAuthor(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
       .setDescription(`${suggestionQuery}`)
       .setColor("00FFFF")
       .setFooter("Status: Pending")
       .setTimestamp();
       
    const done = new MessageEmbed()
       .setDescription(`<:yes_HE:778611379560120320>  | Your suggestion is Submitted here, <#${channel}>\n\nNote: You agreed to get a DM on a reply over your Suggestion!`)
       .setColor("00FFFF")
       
    message.channel.send(done)
    
    let msgEmbed = await message.guild.channels.cache.get(channel).send(embed)
    
    await msgEmbed.react('<a:tick_HE:857837216265142272>')
    await msgEmbed.react('<a:cross_HE:857837361190404108>')
  }
}