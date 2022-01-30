const PlayStore = require("google-play-scraper");
const { CommandInteraction, MessageEmbed, MessageButton,  MessageActionRow } = require("discord.js");

module.exports = {
    name: "playstore",
    description: "Show Playstore Application Information of Given Name!",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'The application name',
            name: 'name',
            required: true,
        },
    ],
    directory: "info",
    userperm: [""],
    botperm: ["SEND_MESSAGES"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => { 

    PlayStore.search({
      term: interaction.options.getString("name"),
      num: 1
    }).then(async (Data) => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return interaction.editReply(
          `No Application Found: **"${args[0]}"**`
        );
      }
try {
      let embed = new MessageEmbed()
        .setColor(bot.color)
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addField(`Price`, `${App.priceText}`)
        .addField(`Developer`, `${App.developer}`)
        .addField(`Score`, `${App.scoreText}`)
        .setFooter({text: `Requested By ${interaction.user.username}`})
        .setTimestamp();

      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle('LINK')
          .setURL(`${App.url}`)
          .setLabel('Go to playstore !!')
      )
  
      return await interaction.editReply({embeds: [ embed ], components:  [row]});
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
    });
  }
};