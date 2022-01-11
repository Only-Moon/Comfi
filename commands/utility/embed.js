const { CommandInteraction } = require('discord.js')
const simplydjs = require("simply-djs")

module.exports = {
	name: 'embed',
	description: 'Embed creator.',
  ownerOnly: false,
  userperm: [""],
  botperm: ["SEND_MESSAGES"],
	
	run: async (bot, interaction, args) => {
		try {

   simplydjs.embedCreate(interaction, {
     credit: false,
     embedColor: bot.color,
     embedFoot: "Comfi™ Embed Creator"
   })
      
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
