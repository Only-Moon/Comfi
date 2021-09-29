const { Message, MessageEmbed } = require("discord.js");

module.exports = {
  name: "ping",
  description: `Check client's ping!`,
  aliases: [""],
  emoji: "🏓",
  timeout: 5000,
  /**
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (bot, message, args, props) => {
    let circles = {
            green: "<a:greenfire:865919100991045653>",
            yellow: "<a:yellowflame:865994340442832906> ",
            red: `${bot.error}`
        }
        const pingEmbed = new MessageEmbed()
            .setColor(bot.color)
            .setAuthor("Pong! 🏓", message.author.avatarURL({ dynamic: true }))
          .addField("Ping :",
                `${bot.ws.ping <= 200 ? circles.green : bot.ws.ping <= 400 ? circles.yellow : circles.red} ${bot.ws.ping}ms`
            )
    message.reply({ embeds: [pingEmbed], allowedMentions: { repliedUser:  false}});
  },
};
