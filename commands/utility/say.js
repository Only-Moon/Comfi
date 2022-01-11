const { Interaction, MessageAttachment } = require("discord.js");
const isUrl = require("is-url");

module.exports = {
  name: "say",
  description: "Says What Said To say",
  type: "CHAT_INPUT",
  ownerOnly: false,
  options: [
    {
      name: "msg",
      description: "What To Say - text or image",
      type: "STRING",
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

    await interaction.editReply({ content: "Sending..." }).catch(() => null);
    await interaction.deleteReply().catch(() => null);

    if (isUrl(say)) {

      const attach = new MessageAttachment(say, 'Sent_Using_Comfi.png')

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

  }
}