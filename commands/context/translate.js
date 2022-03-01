/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { translate } = require('bing-translate-api');

const { ContextMenuInteraction, MessageEmbed } = require('discord.js')

module.exports = {
	name: 'translate',
  description: "translate user's message using context menu",
  directory: "context",
	type: 'MESSAGE',
	userperm: [''],
	botperm: [''],
	/**
	 *
	 * @param {ContextMenuInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
		try {

			const msg = await interaction.channel.messages.fetch(interaction.targetId)
      
      const result = await translate(msg.content, null, en);
      const embed = new MessageEmbed()
  
      .setAuthor({ name: `Comfi™ Translator`, iconURL: bot.user.displayAvatarURL({dynamic:  true })})
    .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
      .setColor(bot.color)
      .addField('Translated from', `\`\`\`${result.text}\`\`\``)
      .addField('Translated to', `\`\`\`${result.translation}\`\`\``)
       .setFooter({ text: `translated to ${result.language.to} from ${result.language.from}`})
      await interaction.editReply({embeds: [ embed ]})
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
