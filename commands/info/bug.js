const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
    config: {
        name: "bug",
        category: 'info',
        aliases: [],
        description: "Reports bug found in Comfi To Developer",
        usage: "bug <message>",
    },
    run: async (bot, message, args) => {

  if (!args[0]) return message.reply("Please specify the bug.");   
    
  args = args.join(" ");   
  message.reply("Thanks for submitting a bug!"); 
  
  
  let embed = new discord.MessageEmbed()
  .setTitle(`Bugs Reoprted`)
  .addDescription(`**Reported By:** ${message.author.username}#${message.author.discriminator}
  **UserID:** ${message.author.id} 
  **Bugs:** ${args}
  **On server**: ${message.guild.name} (${message.guild.id})`)
  .setColor("RANDOM")   
  
  
  bot.channels.cache.get('849267296174473226').send({embeds: [ embed ]})
  
}

}