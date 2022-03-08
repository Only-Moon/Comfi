const bot = require('../../index')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const clientID = process.env["clientID"]

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on('interactionCreate', async (interaction, args) => {
	if (interaction.isButton()) {
		if (interaction.customId == 'inviteyes') {
			await interaction.deferUpdate()

			const inviteyb = new MessageEmbed()
				.setTitle('Thanks for using Comfi - the Multipurpose bot!')
				.setDescription(
					`Here Is My Invite Links: \nServer Moderator: **[Click Me](https://discord.com/api/oauth2/authorize?client_id=${clientID}&permissions=261455474551&scope=bot%20applications.commands)** \nServer Helper: **[Click Me](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot%20applications.commands&permissions=4294967287)** \n\nRecommended: **[Click Me](https://discord.com/api/oauth2/authorize?client_id=${clientID}&permissions=8&scope=bot%20applications.commands)**`
				)
				.setColor('#A2FCAB')

			const joindsc = new MessageButton()
				.setStyle('LINK')
				.setLabel('Join Our Support Server!')
				.setURL('https://comfibot.tk/support')

			const row = new MessageActionRow().addComponents(joindsc)

			await interaction
				.editReply({ embeds: [inviteyb], components: [row]})
				.catch(() => null)
		} else if (interaction.customId === 'inviteno') {
			await interaction.deferUpdate()
			const noooyb = new MessageEmbed()
				.setTitle('Okay Then')
				.setDescription('But Please Join Our Support Server!')
				.setColor('#FE7676')

			const joindscc = new MessageButton()
				.setStyle('LINK')
				.setLabel('Join Our Support Server!')
				.setURL('https://comfibot.tk/support')

			const row1 = new MessageActionRow().addComponents(joindscc)

			await interaction
				.editReply({ embeds: [noooyb], components: [row1]})
				.catch(() => null)
		}
	}
})
