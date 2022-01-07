const { CommandInteraction, MessageButton, MessageActionRow, MessageEmbed } = require('discord.js')
const r = require('link-checker-malicious')

module.exports = {
  name: 'screenshot',
  description: 'Take a screenshot of any webpage',
  ownerOnly: false,
  options: [
    {
      type: 'STRING',
      description: 'Url to take ss',
      name: 'url',
      required: true
    }
  ],
  userperm: [''],
  botperm: ['SEND_MESSAGES'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    const user = interaction.user.tag
    const url = interaction.options.getString('url')
    try {
    const pattern = new RegExp(
"^(https?:\\/\\/)?" +
  "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
  "((\\d{1,3}\\.){3}\\d{1,3}))" +
  "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
  "(\\?[;&a-z\\d%_.~+=-]*)?" +
  "(\\#[-a-z\\d_]*)?$",
  "i"
);
      if (!pattern.test(url)) {
        return interaction
          .editReply(`${bot.error} **• Provide a Valid Url**`)
          .catch(e => { })
      }
      let m = await interaction.editReply(`${bot.tick} **• Getting screenshot..**`)

      const nsfw = r.is_nsfw(url)

      if (nsfw.toString() === "true" && !interaction.channel.nsfw) {
        return interaction.editReply(`${bot.error} **• Nsfw Urls are not allowed in Non-NSFW Channel**`).catch(e => { })
      } else {
        const emb = new MessageEmbed()
            .setColor(bot.color)
            .setAuthor({name: `Comfi™ Screenshot System`, iconURL:  bot.user.displayAvatarURL({dynamic:true})})
            .setImage(`https://image.thum.io/get/png/width/1920/crop/720/noanimate/${url}`)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` });

				const row = new MessageActionRow().addComponents(
					new MessageButton()
						.setStyle('LINK')
						.setURL(`${url}`)          
          .setEmoji(`883017898984103986`)
						.setLabel('Go to Site !!')	);
        
          await interaction.channel.send({
            embeds: [emb],
            components: [row]
          })
          await m.delete().catch(() => null)
      }
    } catch (e) {
      let emed = new MessageEmbed()
        .setTitle(`${bot.error} • Error Occured`)
        .setDescription(`\`\`\`${e.stack}\`\`\``)
        .setColor(bot.color)

      bot.sendhook(null, {
        channel: bot.err_chnl,
        embed: emed
      })

      interaction.followUp({
        embeds: [
          {
            description: `${
              bot.error
              } Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
            color: bot.color
          }
        ]
      })
    }
  }
}
