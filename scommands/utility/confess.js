const { CommandInteraction, MessageEmbed } = require("discord.js");
const { db } = require('../../Database.js');

module.exports = {
    name: "confess",
    description: "Sends an anonymous Confession",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Anonymous Confession',
            name: 'confession',
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
    run: async (bot, interaction, args) => {
await interaction.deleteReply();
    let channel = await db.fetch(`confession_${interaction.guild.id}`);
    if (channel === null) return;
  
  const confessionQuery = args[0]
  if(!confessionQuery) return interaction.editReply("Please Confess Something.");
    
  const embed = new MessageEmbed()
         
       .setTitle('Anonymous Confession')
       .setDescription(`${confessionQuery}`)
       .setColor("FFA0B3")
       .setTimestamp();
       
    
    let msg = await interaction.guild.channels.cache.get(channel)
     await msg.send({ embed: [ embed ] })
  }
}