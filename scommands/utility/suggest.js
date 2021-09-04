const { db } = require('../../Database.js');
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
  const suggestion = interaction.options.getString('suggestion'); 
  let channel = await db.fetch(`suggestion_${interaction.guild.id}`);
    if (!channel) return interaction.editReply(`Please set the suggestion channel first by using **/set-suggestion**`);
  
  simplydjs.suggestSystem(bot, interaction, suggestion, {
   slash: true,
   chid: `${channel}`,
   embedColor: '#F8B6D4', // defaultL #075FFF
   credit: false,
   yesEmoji: '778611379560120320', // default: ☑️
   yesColor: '', // default: green 
   noEmoji: '778611410539905044', // default: X
   noColor: '', // default: red
   });
  }
}