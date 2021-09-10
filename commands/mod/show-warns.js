const { db } = require('../../Database.js');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "warns-show",
    description: "Get the warnings of yourself or mentioned user",
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'Username',
            name: 'user',
            required: true,
        },
    ],
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
      try {
    const user = interaction.options.getUser('user') || interaction.member 
    
  
    let warnings = await db.get(`warnings_${interaction.guild.id}_${user.id}`)
    
    
    if(warnings === null) warnings = 0;
    
let warn = new MessageEmbed()
      .setTitle(`__Warn Report__`)
      .setDescription(`${user} have **${warnings}** warning(s)`)
      .setColor("#F4B3CA");
  
  interaction.editReply({embeds: [ warn ]})

} catch(error) {
  return interaction.editReply(`Sorry <${interaction.user}> I couldn't n't warn because of : ${error}`) 
}
        
  }
}