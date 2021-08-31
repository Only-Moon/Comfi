const { db } = require('../../Database.js');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "warn-remove",
    description: "Reset warnings of mentioned user",
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'Username to remove warns',
            name: 'user',
            required: true,
        },
    ],
    userperm: ["ADMINISTRATOR"],
    botperm: ["MANAGE_SERVER"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
  try {
    const user = interaction.options.getUser('user')
    
    if(user.bot) {
      return interaction.editReply("Bot are not allowed to have warnings")
    }
    
    if(interaction.member.id === user.id) {
      return interaction.editReply("You are not allowed to reset your warnings")
    }
    
    let warnings = await db.get(`warnings_${interaction.guild.id}_${user.id}`)
    
    if(warnings === null) {
      return interaction.editReply(`${user} do not have any warnings`)
    }
    
   await db.delete(`warnings_${interaction.guild.id}_${user.id}`);
   let warn1 = new MessageEmbed()
    .setTitle(`__Warnings__`)
    .setDescription(`Your all warnings are reseted by ${interaction.user} from ${interaction.guild.name}`)
   .setColor("#F4B3CA");
  user.send({embeds: [ warn1 ]});
  
    let warn = new MessageEmbed()
      .setTitle(`__Warn Report__`)
      .setDescription(`Reseted all warnings of ${user.username}`)
      .setColor("#F4B3CA")

await interaction.editReply({embeds: [ warn ]})
  } catch(error) {
    return interaction.editReply(`Sorry <${interaction.user}> I couldn't n't warn because of : ${error}`)
  }

}
}
