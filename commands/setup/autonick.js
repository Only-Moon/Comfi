/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js')
const guilds = require('../../models/guild')

module.exports = {
  name: 'autonick',
  description: 'Auto nick members on join!',
  ownerOnly: false,
  directory: "setting",
  options: [
    {
      name: "set",
      description: "set name for auto nick",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'nick',
          description: 'nickname to set',
          type: ApplicationCommandOptionType.String,
          required: true
        },
      ],
    },
    {
      name: "help",
      description: "help for autonick",
      type: ApplicationCommandOptionType.Subcommand 
    }
  ],
  botperm: ['ManageGuild'],
  userperm: ['ManageGuild'],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {

    const [sub] = args

    try {
      if (sub === "set") {

        const arg = interaction.options.getString("nick")
        if (!args.length || args.length >= 32) {
          return await bot.errorEmbed(bot, interaction, `Please supply a nickname! (FYI: Set the nickname as "none" if you want it to be disabled)`
          )
        } else {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            { auto_nick: arg }
          )

          return await bot.successEmbed(bot, interaction, `Auto nick has been set! Current value: **${args}**\n Use **none** as a value to disable it.`
          )
        }
      }
      if (sub === "help") {

        const embed = new EmbedBuilder()
          .setTitle(`Autonick System variables`, bot.user.displayAvatarURL())
          .setDescription(`Need Help setting Autonick system?`)
          .addFields(
            {
              name: "Commands",
              value: `\`\`\`set - sets the name for autonick system\n\`\`\``
            },
            {
              name: 'Tags',
              value: `\`\`\`{{user#name}} - username of the user\n\`\`\``,
              inline: true
            }
          )
          .setColor(bot.color)
          .setFooter({text:`Comfi™ Autonick System`});
        await interaction.editReply({ embeds: [embed] })

      }
    } catch (e) {
  await bot.senderror(interaction, e)

    }
  }
}