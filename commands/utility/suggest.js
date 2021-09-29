const guilds = require('../../models/guild');
const simplydjs = require('simply-djs')
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggest",
    description: "Suggestion for server",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'The Suggestion',
            name: 'suggestion',
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
    if(guild.suggestions) {

  const suggestion = interaction.options.getString('suggestion'); 
  let channel = guild.suggestions_channel

  if(!channel) return;
  
  simplydjs.suggestSystem(bot, interaction, suggestion, {
   slash: true,
   chid: `${channel}`,
   embedColor: bot.color, // defaultL #075FFF
   credit: false,
   yesEmoji: `${bot.tick}`, // default: ☑️
   yesColor: '', // default: green 
   noEmoji: `${bot.crosss}`, // default: X
   noColor: '', // default: red
   });
  } else if (!guild.suggestions) {

interaction.editReply(`${bot.error} Please Ask an Admin to set the suggestion channel first by using **/suggestion**`);
      
}
}}