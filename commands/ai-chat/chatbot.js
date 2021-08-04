const Discord = require('discord.js')
const { db } = require('../../Database.js')
const config = require('../../config.js')

module.exports = {
	config: {
		name: 'chatbot',
		aliases: ['chat-setup'],
		category: "admin",
		description: 'Shows setup for AI Chat System',
		usage: 'chat-setup'
	},
	run: async (bot, message, args) => {
       
        const embedd = new Discord.MessageEmbed()
        .setThumbnail(bot.user.avatarURL())
        .setDescription(
          `🤖 ChatBot Configuration 
  
          **🔮 Usage :**
           Type \`${config.PREFIX}setchatbotchannel\` - To Set a Channel 
           Type \`${config.PREFIX}disablechatbotchannel\` - To Disable a Channel.
           ChatBot Channel Set - None
  
          **🔮 Examples :**
           \`${config.PREFIX}setchatbotchannel\` <#${message.channel.id}>
           \`${config.PREFIX}disablechatbotchannel\` <#${message.channel.id}>`
        )
        .setTimestamp()
        .setFooter(
          "© Comfi",
bot.user.avatarURL()
        )
        .setColor('#F8B6D4');
      
       let channel1 = await db.fetch(`chatbot_${message.guild.id}`);
      if(!channel1) return message.channel.send(embedd)
      var sChannel = message.guild.channels.cache.get(channel1);
      let embedvch = "<#" + sChannel.id + ">"
      
      const embed = new Discord.MessageEmbed()
      
        .setThumbnail(bot.user.avatarURL())
        .setDescription(
          `**🤖 ChatBot Configuration** 
  
          **🔮 Usage :**
           Type \`${config.PREFIX}setchatbotchannel\` - To Set a Channel 
           Type \`${config.PREFIX}disablechatbotchannel\` - To Disable a Channel.
           ChatBot Channel Set - ${embedvch} 
  
          **$🔮 Examples :**
           \`${config.PREFIX}setchatbotchannel\` <#${message.channel.id}>
           \`${config.PREFIX}disablechatbotchannel\` <#${message.channel.id}>`
                       )
       .setTimestamp()
        .setFooter(
          "© Comfi", bot.user.avatarURL()
        )
        .setColor('#F8B6D4');
      message.channel.send(embed);

    }
}