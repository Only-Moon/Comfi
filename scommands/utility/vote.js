const Color = "#F4B3CA";
const Discord = require("discord.js");

module.exports = {
  name: "vote",
  description: "Vote For Comfi",
    
run: async (bot, interaction, args) => {
    
    const embed = new Discord.MessageEmbed()
    .setColor(Color)
    .setTitle("Vote Bot")
    .setDescription("You can vote us in **discordbotlist** and **top.gg** \n Top.gg Coming soon \n\n **_discordbotlist_** Coming soon")
    .setTimestamp();

    return interaction.editReply({embeds: [ embed ], allowedMentions: { repliedUser: false }});
  }
};
