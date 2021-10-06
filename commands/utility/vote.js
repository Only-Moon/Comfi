const Discord = require("discord.js");

module.exports = {
  name: "vote",
  description: "Vote For Comfi",
  userperm: [""],
  botperm: [""],
  ownerOnly: false,
  
run: async (bot, interaction, args) => {
    
    const embed = new Discord.MessageEmbed()
    .setColor(bot.color)
    .setTitle("Vote For Comfi")
    .setDescription("You can vote for her from **discordbotlist** and **top.gg** \n Top.gg Coming soon \n\n **_discordbotlist_** Coming soon")
    .setTimestamp();
let top = new Discord.MessageButton()
           .setStyle("LINK")
           .setURL("https://tog.gg")
           .setLabel("Top.gg")
           .setDisabled();
let bots = new Discord.MessageButton()
           .setStyle("LINK")
           .setURL("http://botlist.com")
           .setLabel("discord.bot")
           .setDisabled();

let row = new Discord.MessageActionRow()
   .addComponents(bots, top); 
  
return interaction.followUp({ 
        embeds: [embed], 
        components: [row]
});
  }
};
