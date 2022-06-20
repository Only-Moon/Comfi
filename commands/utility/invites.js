/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const {
  CommandInteraction,
  MessageEmbed,
} = require('discord.js')

module.exports = {
  name: 'invites',
  description: 'Get the number of people that joined via your invites',
  ownerOnly: false,
  directory: "utility",
  options: [
    {
      name: 'user',
      type: 'USER',
      description: 'tag to see their invs',
      required: false
    }
  ],
  userperm: [''],
  botperm: ['SEND_MESSAGES'],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    try {
      const user =
        interaction.guild.members.cache.get(args[0]) || interaction.member

      let invites = await interaction.guild.invites.fetch()
      let userInv = invites.filter(u => u.inviter && u.inviter.id === user.id)

      if (userInv.size <= 0) {
        return interaction.channel.send({
          content: `${user} has \`0\` invites `
        })
      }

      let invCodes = userInv.map(x => x.code).join('\n')
      let i = 0
      userInv.forEach(inv => (i += inv.uses))

      const tackerEmbed = new MessageEmbed()
        .setDescription(`**_Invites  of :_** ${user} `)
        .addField(`User Invites`, `${i}`)
        .addField('Invite Codes:', `${invCodes}`)
        .setColor(bot.color)

      await interaction.followUp({ embeds: [tackerEmbed] })
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}
