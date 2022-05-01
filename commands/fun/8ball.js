/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { Client, CommandInteraction, MessageEmbed } = require('discord.js')

module.exports = {
	name: '8ball',
	description: 'You ask and i answer',
	ownerOnly: false,
  directory: "fun",
	options: [
		{
			type: 'STRING',
			description: 'Your question',
			name: 'question',
			required: true
		}
	],
	userperm: [''],
	botperm: [''],
	/**
	 * @param {Message} message
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		const answers = [
			'Maybe.',
			'Certainly not.',
			'I hope so.',
			'Not in your wildest dreams.',
			'There is a good chance.',
			'Quite likely.',
			'I think so.',
			'I hope not.',
			'I hope so.',
			'Never!',
			'Fuhgeddaboudit.',
			'Ahaha! Really?!?',
			'Pfft.',
			'Sorry, bucko.',
			'Hell, yes.',
			'Hell to the no.',
			'The future is bleak.',
			'The future is uncertain.',
			'I would rather not say.',
			'Who cares?',
			'Possibly.',
			'Never, ever, ever.',
			'There is a small chance.',
			'Yes!'
		]

		try {
			const member =
				interaction.guild.members.cache.get(args[0]) || interaction.member

			let yq = args.join(' ')
			let q = args.join(' ')
			if (!yq) {
				return
			} else {
				const embed = new MessageEmbed()
					.setAuthor({
						name: `${member.user.tag} Asked me`,
						iconURL: member.user.avatarURL({ dynamic: true })
                     })
					.setDescription(
						`**Question:** \n ${yq} \n**My Answer:** \n ${
							answers[Math.floor(Math.random() * answers.length)]
						}`
					)
					.setColor(bot.color)
				interaction.followUp({ embeds: [embed] }).catch(() => null)
			}
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
