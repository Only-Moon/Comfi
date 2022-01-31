const { CommandInteraction, MessageButton, MessageActionRow, MessageEmbed, MessageAttachment } = require('discord.js')
const r = require('link-checker-malicious')
const fetch = require("axios")

module.exports = {
  name: 'screenshot',
  description: 'Take a screenshot of any webpage',
  ownerOnly: false,
  directory: "utility",
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
      let m = await interaction.editReply({content: `${bot.tick} **• Getting screenshot..**`}).then(async (msg) => {

      const nsfw = r.is_nsfw(url)

      if (nsfw.toString() === "true" && !interaction.channel.nsfw) {
        return interaction.editReply(`${bot.error} **• Nsfw Urls are not allowed in Non-NSFW Channel**`).catch(e => { })
      } else {

let res = await fetch(`https://api.ultrax-yt.com/v1/screenshot?url=${url}&key=ZRXWJKyu0aPM`)

const buffer = new Buffer.from(res.data.screenshot.split(",")[1], "base64")
  
const image = new MessageAttachment(buffer, 'screenshot.png')
  
const emb = new MessageEmbed()
            .setColor(bot.color)
            .setAuthor({name: `Comfi™ Screenshot System`, iconURL:  bot.user.displayAvatarURL({dynamic:true})})
            .setImage(`attachment://screenshot.png`)
            .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` });

				const row = new MessageActionRow().addComponents(
					new MessageButton()
						.setStyle('LINK')
						.setURL(`${url}`)          
          .setEmoji(`883017898984103986`)
						.setLabel('Go to Site !!')	);
        
          await interaction.channel.send({
            embeds: [emb],
            files: [ image ],
            components: [row]
          })
          await msg.delete().catch(() => null)
      }

      }).catch(async (e) => {
        return await  bot.errorEmbed(bot, interaction, `I can't screenshot that url`)
})

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
