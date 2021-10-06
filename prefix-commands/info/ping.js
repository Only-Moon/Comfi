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
  run: async (bot, message, args) => {
    const msg = new MessageEmbed()
      .setDescription(`Bot Latency: ${bot.ws.ping}ms`)
      .setColor(bot.color)
      .setTitle("Pinged Successfully 🏓");
    message.channel.send({ embeds: [msg] });
  },
};
