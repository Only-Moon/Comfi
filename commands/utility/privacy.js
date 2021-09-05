const Discord = require("discord.js"); 

module.exports = { 
  name: "privacy", 
  description: "privacy policy for the bot ", 
  
  run: async(bot, interaction, args) => {
    const embed = new Discord.MessageEmbed()
      .setTitle("Comfi Bot's Privacy Policy")
      .setDescription(" We do not store any data apart from the Commands Database and if the User Contact us from anywhere his data will be cleared, we do not store any type of personal data. We Follow all [Discord's Terms of Service](https://discord.com/terms) and [Community Guidelines](https://discord.com/guidelines).")
      .setColor("#F4B3CA")

    await interaction.editReply({ embeds: [ embed ]})
  } 
} 