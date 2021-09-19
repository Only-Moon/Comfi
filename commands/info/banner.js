const { CommandInteraction, MessageEmbed } = require("discord.js");
const axios = require("axios")

module.exports = {
  name: "banner",
  description: "Get the banner of the specified member",
    ownerOnly: false,
  options: [
    {
      name: "member",
      description: "Input member to get banner",
      type: "USER",
      required: true,
    },
  ],
    userperm: [""],
    botperm: [""],
  /**
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    const { user } = interaction.options.get("member");
const api = process.env.TOKEN
    axios.get(`https://discord.com/api/users/${user.id}`, {
      headers: {
        Authorization: `Bot ${api}`
      },
    })
    .then((res) => {
      const { banner, accent_color } = res.data;

      if (banner) {
        const extension = banner.startsWith("a_") ? ".gif" : ".png";
        const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=2048`;

        const embed = new MessageEmbed()
        .setTitle(`${user.tag}'s Banner`)
        .setImage(url)
        .setColor(accent_color || bot.color);
        
        interaction.followUp({ embeds: [embed] })
      } else {
        if (accent_color) {
          const embed = new MessageEmbed()
          .setDescription(`**${user.tag}** does not have a banner but they have an accent color`)
          .setColor(accent_color)

          interaction.followUp({ embeds: [embed] })
        } else {
          interaction.followUp({ content: `**${user.tag}** does not have a banner, they have an accent color.`})
        }
      }
    });
  },
};
