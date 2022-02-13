const { translate } = require('bing-translate-api');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "translatee",
    description: "Translate Text to your preferred language",
    directory: "utility",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Language you want the text to get translated to',
            name: 'language',
            autocomplete: true,
            required: true,
        },
      {
            type: 'STRING',
            description: 'Text to translate',
            name: 'text',
            required: true,
        },
    ],
    userperm: [""],
    botperm: ["SEND_MESSAGES"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

    try {
const lang = interaction.options.getString("language");
      const text = interaction.options
        .getString('text')
        .split("")
        .slice(0, 999)
        .join("");
      
      const result = await translate(text, null, lang);
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