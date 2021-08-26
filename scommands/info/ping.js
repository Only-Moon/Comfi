const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "returns bots ping",

    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
        let circles = {
            green: "<a:greenfire:865919100991045653>",
            yellow: "<a:yellowflame:865994340442832906> ",
            red: "<a:warning:865919101300768779> "
        }
        const pingEmbed = new MessageEmbed()
            .setColor("#5539cc")
            .addField("Bots Ping :",
                `${bot.ws.ping <= 200 ? circles.green : bot.ws.ping <= 400 ? circles.yellow : circles.red} ${bot.ws.ping}ms`
            )
        interaction.followUp({ embeds: [pingEmbed] });
    },
};
