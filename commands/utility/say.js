/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, AttachmentBuilder, ApplicationCommandOptionType } = require("discord.js");
const isUrl = new RegExp(
  "^(https?:\\/\\/)?" +
  "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
  "((\\d{1,3}\\.){3}\\d{1,3}))" +
  "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
  "(\\?[;&a-z\\d%_.~+=-]*)?" +
  "(\\#[-a-z\\d_]*)?$",
  "i"
);;

module.exports = {
  name: "say",
  description: "Make Comfi say something",
  ownerOnly: false,
  directory: "utility",
  options: [
    {
      name: "msg",
      description: "Make Comfi say a text",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  userperm: [""],
  botperm: [""],

  /**
   *
   * @param {Interaction} interaction
   */
  run: async (bot, interaction) => {
    const say = interaction.options.getString("msg")

    try {

      await interaction.editReply({ content: "Sending..." }).catch(() => null);
      await interaction.deleteReply().catch(() => null);

      if (isUrl.test(say)) {

        const attach = new AttachmentBuilder(say, {name: 'Sent_Using_Comfi.png'})

        await interaction.channel.send({ files: [attach] })

      } else {

        if (interaction.member.permissions.has("ADMINISTRATOR")) {

          await interaction.channel.send({ content: `${say}`, allowedMentions: { repliedUser: true } })

        } else {

          await interaction.channel.send({
            content: `**${say}**\n- by ${interaction.member.displayName}`,
            allowedMentions: {
              repliedUser: false
            }
          })

        }
      }
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}