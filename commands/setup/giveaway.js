/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const simplydjs = require("simply-djs");
let { Database } = require('quickmongo')
let db = new Database(process.env.Mongoose)

module.exports = {
    name: "giveaway",
    description: "Setups a giveaway in the server",
    ownerOnly: false,
  directory: "setting",
    options: [
     {
        name: 'time',
        type: 'STRING',
        description: 'Time when to finish the giveaway',
        required: true,
      },
      {
        name: 'winners',
        type: 'INTEGER',
        description: 'Number of Winners for the giveaway',
        required: true,
      },
      {
        name: 'prize',
        type: 'STRING',
        description: 'Prize given to the giveaway winner',
        required: true,
      },
      {
        name: 'channel',
        type: 'CHANNEL',
        description: 'Channel to start the giveaway',
        required: false,
        channelTypes: ["GUILD_TEXT"],
      }
      ],
    userperm: ["MANAGE_GUILD"],
    botperm: ["MANAGE_GUILD"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

simplydjs.giveawaySystem(bot, db, interaction, {
  slash: true,
  args: args,

  time: args[0],
  winners: args[1],
  prize: args[2],
})

    }}   