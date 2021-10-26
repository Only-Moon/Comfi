const { CommandInteraction, MessageEmbed } = require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
    name: "serverlist",
    description: "Displays the list of servers the bot is in!",
    ownerOnly: true,
    userperm: ["ADMINISTRATOR"],
    botperm: ["MANAGE_SERVER"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
        
const guilds = bot.guilds.cache.sort((a, b) => b.memberCount - a.memberCount); 

let pages = []

guilds.forEach(guild => {
  
const embed = new MessageEmbed() 
        .setTitle(`Guilds for ${bot.user.username}`)
        .setColor(bot.color) 
  .setFooter(`Requested by ${interaction.user.tag}`) 
 .addFields(
      {
         name: "Guild Name 》",
         value: `${guild.name}`,
         inline: true
      },
      {
         name: "Guild Id 》",
         value: `${guild.id}`,
         inline: true
      },
      {
         name: "Member Count 》",
         value: `${guild.memberCount}`,
         inline: true
      },
)
      
pages.push(embed)
})
  
simplydjs.embedPages(bot, interaction, pages, {
slash: true,
backEmoji: '884420649580363796', 
delEmoji: '891534962917007410',  
forwardEmoji: '884420650549272586', 
btncolor: 'SECONDARY',
delcolor: 'SECONDARY', 
skipBtn: false,
})
      
  }
};