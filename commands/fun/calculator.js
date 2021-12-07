const { CommandInteraction, MessageEmbed } = require("discord.js");
const simplydjs = require("simply-djs")

module.exports = {
    name: "calculator",
    description: "Advance Calculator",
    ownerOnly: false,
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

  simplydjs.calculator(interaction, {
    embedColor: bot.color,
    slash: true,
    credit: true
  })      
}}