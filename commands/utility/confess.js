const { CommandInteraction, MessageEmbed } = require("discord.js");
const guilds = require('../../models/guild');

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

    const guild = await guilds.findOne({guildId: interaction.guild.id})
    if(guild.confession) {

await interaction.deleteReply();
    let channel = guild.confess_channel
    if (!channel) return;
  
  const confessionQuery = interaction.options.getString("confession").split("").slice(0, 4000).join("")
  if(!confessionQuery) return interaction.editReply("Please Confess Something.");
    
  const embed = new MessageEmbed()
         
       .setTitle('Anonymous Confession')
       .setDescription(`> ${confessionQuery}`)
       .setColor(bot.color)
       .setTimestamp();
       
    
    let msg = await interaction.guild.channels.cache.get(channel).send({ embeds: [ embed ] })
  } else if (!guild.confession) {

interaction.editReply(`${bot.error} Confession Channel Not Found, Ask an Admin to set it.`)

}

}}