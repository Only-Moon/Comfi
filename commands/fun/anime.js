/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

module.exports = {
	name: 'anime',
	description: 'Get Anime Actions',
  directory: "fun",
	options: [
		{
			name: 'category',
			description: 'which action do you want',
			required: true,
			type: 'STRING',
			choices: [
				{
					name: 'cuddle',
					value: 'cuddle'
				},
				{
					name: 'hug',
					value: 'hug'
				},
				{
					name: 'kiss',
					value: 'kiss'
				},
				{
					name: 'smile',
					value: 'smile'
				},
				{
					name: 'wave',
					value: 'wave'
				},
				{
					name: 'handhold',
					value: 'handhold'
				},
				{
					name: 'wink',
					value: 'wink'
				},
				{
					name: 'poke',
					value: 'poke'
				},
				{
					name: 'dance',
					value: 'dance'
				},
				{
					name: 'cringe',
					value: 'cringe'
				},
				{
					name: 'kill',
					value: 'kill'
				},
				{
					name: 'slap',
					value: 'slap'
				},
				{
					name: 'bite',
					value: 'bite'
				},
				{
					name: 'highfive',
					value: 'highfive'
				},
				{
					name: 'blush',
					value: 'blush'
				},
				{
					name: 'pat',
					value: 'pat'
				},
				{
					name: 'smug',
					value: 'smug'
				},
				{
					name: 'bonk',
					value: 'bonk'
				},
				{
					name: 'cry',
					value: 'cry'
				},
				{
					name: 'bully',
					value: 'bully'
				},
				{
					name: 'yeet',
					value: 'yeet'
				},
				{
					name: 'happy',
					value: 'happy'
				},
				{
					name: 'kick',
					value: 'kick'
				}
			]
		},
    {
      name: "user",
      type: "USER",
      description: "user to send anime gif",
      required: true
    },
	],
	userperm: [''],
	botperm: [''],

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {

let user = interaction.options.getUser("user")

  let arg = interaction.options.getString("category")
      
			const { Slash } = require('djs-anime')
			const slash = new Slash({
				type: args,
				interaction: interaction,
				embedFooter: `Requested by ${interaction.member.displayName}`,
				embedTitle: `${interaction.user.username} ${arg}ed ${user.username}`,
				embedColor: bot.color
			})
			slash.anime()
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
