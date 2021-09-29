const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    description: "Shows Bot Ping",
    ownerOnly: false,
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {

let circles = {
            green: "<a:green_fire:890138128499736636>",
            yellow: "<a:enoobies_fire:883032979746725928>",
            red: "<a:p_fire2:890138689072672788>"
        }
        const pingEmbed = new MessageEmbed()
            .setColor(bot.color)
            .setAuthor("Pong! 🏓", interaction.user.avatarURL({ dynamic: true }))
          .addField("Ping :",
                `${bot.ws.ping <= 200 ? circles.green : bot.ws.ping <= 400 ? circles.yellow : circles.red} ${bot.ws.ping}ms`
            )
        interaction.editReply({ embeds: [pingEmbed] });

}}