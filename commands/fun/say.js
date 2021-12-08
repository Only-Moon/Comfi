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

if(isUrl(say)){

const attach = new MessageAttachment(say, 'Sent_Using_Comfi.png')

interaction.channel.send({ files: [attach] }).catch((e) => {
        bot.sendhook(
          `Error Occured \n ${e.stack}`
        ), {
          channel: bot.err_chnl
        } 
        interaction.followUp({
          content: `${bot.error} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
          ephemeral: true
        });
        })
  
} else {
await interaction.channel.send({ content: say }).catch((e) => {
        bot.sendhook(
          `Error Occured \n ${e.stack}`
        ), {
          channel: bot.err_chnl
        } 
        interaction.followUp({
          content: `${bot.error} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
          ephemeral: true
        });
        })
  }
  
  }
}