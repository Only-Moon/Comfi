const PlayStore = require("google-play-scraper");
const { CommandInteraction, MessageEmbed } = require("discord.js");

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
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => { 

    PlayStore.search({
      term: args[0],
      num: 1
    }).then(Data => {
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
        .setFooter(`Requested By ${interaction.user.username}`)
        .setTimestamp();

      return interaction.editReply({embeds: [ embed ]});
} catch (err) {
return interaction.editReply(` Error Occured - [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord) `)
}
    });
  }
};