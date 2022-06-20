/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const simplydjs = require("simply-djs");

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
      type: 'NUMBER',
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
      name: "req-type",
      type: "STRING",
      description: "Type of requirements for giveaway aka 'Role', 'Guild', 'None'",
      required: true,
      choices: [
      {
       name: "Guild",
       value: "Guild"
      },
        {
          name: "Role",
          value: "Role"
        },
        {
          name: "None",
          value: "None"
        }
      ]
    },
    {
      name: "req-id",
      type: "STRING",
      description: "role id or guild id for role or guild requirements",
      required: false
    },    
    {
      name: 'channel',
      type: 'CHANNEL',
      description: 'Channel to start the giveaway',
      required: false,
      channelTypes: ["GUILD_TEXT"],
    }, 
  ],
  userperm: ["MANAGE_GUILD"],
  botperm: ["MANAGE_GUILD"],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    try {
      const channel = interaction.options.getChannel("channel")
      const type = interaction.options.getString("req-type")
      const id = interaction.options.getString("req-id")
      const time = interaction.options.getString("time")
      const prize = interaction.options.getString("prize")
      const winner = interaction.options.getNumber("winners")

      simplydjs.giveawaySystem(bot, interaction, {
        time: time,
        winners: winner,
        prize: prize,
        channel: channel,
        embed: {
          title: "Giveaway",
          color: bot.color,
          credit: false,
          footer: { text: "Comfi™ Giveaway System" }
        },
      req: {
        type: type,
        id: id
      }
      })

    } catch {
      await bot.senderror(interaction, e)
    }

  }
}   