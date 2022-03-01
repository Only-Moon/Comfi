/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require('discord.js')
const guilds = require('../../models/guild')

module.exports = {
	name: 'autonick',
	description: 'Auto nick members on join!',
	ownerOnly: false,
  directory: "setting",
	options: [
		{
			name: 'nick',
			description: 'nickname to set',
			type: 'STRING',
			required: true
		}
	],
	botperm: ['MANAGE_GUILD'],
	userperm: ['MANAGE_GUILD'],
	/**
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {
const arg = interaction.options.getString("name")		
  if (!args.length || args.length >= 32) {
        return await  bot.errorEmbed(bot, interaction, `Please supply a nickname! (FYI: Set the nickname as "none" if you want it to be disabled)`
				)
			} else {
			await guilds.findOneAndUpdate(
				{ guildId: interaction.guild.id },
        { auto_nick: args				}
			)

        return await bot.successEmbed(bot, interaction, `Auto nick has been set! Current value: **${args}**\n Use **none** as a value to disable it.`
)	  
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