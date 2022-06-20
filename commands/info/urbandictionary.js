/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const urban = require('relevant-urban');
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "urbandictionary",
  description: "Give information about urban words",
  ownerOnly: false,
  options: [
    {
      type: 'STRING',
      description: 'Word to Search',
      name: 'word',
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

    let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
    try {
      let res = await urban(args.join(' '))
      if (!res) return interaction.editReply("No results found for this topic, sorry!");
      let { word, urbanURL, definition, example, thumbsUp, thumbsDown, author } = res;

      let embed = new MessageEmbed()
        .setColor(bot.color)
        .setAuthor(`Word - ${word}`)
        .setThumbnail(image)
        .setDescription(`**Defintion:**\n*${definition || "No definition"}*\n\n**Example:**\n*${example || "No Example"}*`)
        .addField('**Rating:**', `**\`Upvotes: ${thumbsUp} | Downvotes: ${thumbsDown}\`**`)
        .addField("**Link**", `[link to ${word}](${urbanURL})`)
        .addField("**Author:**", `${author || "unknown"}`)
        .setTimestamp();

      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle('LINK')
          .setURL(`${urbanURL}`)
          .setLabel(`Link to ${word}`)
      )

      await interaction.editReply({ embeds: [embed], components: [row] })

    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}
