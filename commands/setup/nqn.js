/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, ApplicationCommandOptionType } = require('discord.js')
const guilds = require('../../models/guild')

module.exports = {
  name: 'nqn',
  description: 'Use animated emojis without nitro',
  directory: "setting",
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      description: 'Toggle nqn',
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
      ]
    }
  ],
  userperm: ['ManageGuild'],
  botperm: ['ManageGuild'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const toggle = interaction.options.getString('option')
      const guild = await guilds.findOne({guildId:  interaction.guild.id})

      if (guild.nqn === toggle)         return await  bot.errorEmbed(bot, interaction, `Nqn toggle for **${interaction.guild.name}** has already been set to **${toggle}**`)
      await guilds.findOneAndUpdate(
        { guildId: interaction.guild.id },
        {
          nqn: toggle
        }
      )
        return await bot.successEmbed(bot, interaction, `Nqn for **${interaction.guild.name}** has been set to: **${toggle}**`
      )
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}
