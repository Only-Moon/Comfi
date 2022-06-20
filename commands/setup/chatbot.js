/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const guilds = require('../../models/guild');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "chatbot",
  description: "Sets the chatbot system",
  directory: "setting",
  ownerOnly: false,
  options: [{
    type: 'SUB_COMMAND',
    description: 'Sets the chatbot toggle true/false',
    name: 'toggle',
    options: [{
      type: 'STRING',
      description: 'Toggle chatbot',
      name: 'option',
      required: true,
      choices: [
        {
          name: 'true/on',
          value: 'true'
        },
        {
          name: 'false/off',
          value: 'false'
        }
      ],
    },
    ],
  },
  {
    type: 'SUB_COMMAND',
    description: 'Sets the channel for chatbot',
    name: 'channel',
    options: [
      {
        type: 'CHANNEL',
        description: 'Channel for Chatbot',
        name: 'name',
        required: true,
        channelTypes: ["GUILD_TEXT"],
      },
    ],
  },
  {
    type: 'SUB_COMMAND',
    description: 'Disables the chatbot system',
    name: 'disable',
  },
  ],
  userperm: ["MANAGE_CHANNELS"],
  botperm: ["MANAGE_CHANNELS"],
  /** 
*
* @param {CommandInteraction} interaction
* @param {String[]} args 
*/

  run: async (bot, interaction, args) => {
    let [option] = args

    const guild = await guilds.findOne({ guildId: interaction.guild.id })

    try {

      if (option === 'toggle') {
        const toggle = interaction.options.getString('option')

        if (guild.chatbot.toString() === toggle) {

          return await bot.errorEmbed(bot, interaction, `**Chatbot toggle for this guild is set as ${toggle}`)

        } else {

          await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
            chatbot: toggle
          })
          return await bot.successEmbed(bot, interaction, `The Chatbot for **${
            interaction.guild.name
            }** has been set to: **${toggle}**`
          );
        }
      }
      if (option === 'channel') {
        const channel = interaction.options.getChannel('name');
        if (!channel)
          return interaction.editReply(`${bot.error} **Specify the channel**`);

        if (guild.chat_channel === channel) {

          return await bot.errorEmbed(bot, interaction, `**Chatnot channel is already setted as ${channel}**`)

        } else {

          await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
            chat_channel: channel,
          })
          return await bot.successEmbed(bot, interaction, `**The chatbot channel has been set to** ` + channel.toString()
          );
        }
      }

      if (option === 'disable') {
        if (!guild.chatbot) {
          return await bot.errorEmbed(bot, interaction, `**Please set the required fields first or i cant disable it!**`);
        } else {
          await guilds.findOneAndUpdate({ guildId: interaction.guild.id }, {
            chatbot: false,
            chat_channel: "NONE",
          })
          return await bot.successEmbed(bot, interaction, `**Disabled the Chatbot System in the server :)**`);
        }
      }
    } catch {
      await bot.senderror(interaction, e)
    }
  }
}