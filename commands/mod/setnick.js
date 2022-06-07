/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { Interaction, MessageEmbed } = require('discord.js')
const guilds = require('../../models/guild')

module.exports = {
  name: 'setnick',
  description: 'Sets a Nickname to user',
  directory: "mod",
  options: [
    {
      name: 'user',
      description: 'User to change nickname',
      type: 6,
      required: true
    },
    {
      name: 'nickname',
      description: 'New nickname',
      type: 3,
      required: true
    },
    {
      name: "reason",
      description: "Reason to change nickname",
      type: 3,
      required: false
    }],
  userperm: ['MANAGAE_NICKNAMES'],
  botperm: ['MANAGAE_NICKNAMES'],
	/**
	 *
	 * @param {Interaction} interaction
	 */
  run: async (bot, interaction, args) => {
    try {
      // now extract values
      const member =
        interaction.options.getMember('user') ||
        interaction.guild.members.cache.get(args[0])
      const nickname = interaction.options.getString('nickname')
      const reason = interaction.options.getString("reason")
      const embed = new MessageEmbed().setColor(bot.color)

      if (!member.manageable && member.user.id !== bot.user.id) {
        embed.setDescription(
          `${bot.error} • I Cant Change ${usmber.toString()}'s Nickname`
        )
        return interaction.editReply({ embeds: [embed] })
      }

      const oldNick = usmber.nickname
        ? usmber.nickname
        : usmber.user.username

      await member.setNickname(nickname.value)
      embed
        .setDescription(
          `${bot.tick} • ${usmber.toString()}'s Nickname Changed`
        )
        .setFooter(`From ${oldNick} to ${nickname.value}`)

      await interaction.editReply({ embeds: [embed] }).catch(() => null)

      await bot.modlog({
        Member: member,
        Action: "nickname changed ",
        Reason: reason.length < 1 ? 'No reason supplied.' : reason
      }, interaction)
    } catch (e) {
      let emed = new MessageEmbed()
        .setTitle(`${bot.error} • Error Occured`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
        .setColor(bot.color)

      bot.sendhook(null, {
        channel: bot.err_chnl,
        embed: emed
      })

      interaction.followUp({
        embeds: [
          {
            description: `${
              bot.error
              } Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
            color: bot.color
          }
        ]
      })
    }
  }
}
