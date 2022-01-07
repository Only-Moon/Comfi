const {
  CommandInteraction,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  Util
} = require('discord.js')
const simplydjs = require('simply-djs')

module.exports = {
  name: 'emoji',
  description: 'Enlarge an emote or find emote from Comfi\'s emote list',
  ownerOnly: false,
  options: [
    {
      name: "enlarge",
      description: "enlarge one or more than one emotes",
      type: "SUB_COMMAND",
      options: [
        {
          type: 'STRING',
          description: 'Emojis to Enlarge',
          name: 'name',
          required: true
        }
      ],
    },
    {
      name: "find",
      description: "find an emote from Comfi's emote list",
      type: "SUB_COMMAND",
      options: [
        {
          name: "emote",
          description: "enter a name to search emote",
          type: "STRING",
          required: true
        }
      ],
    },
  ],
  userperm: [''],
  botperm: ['SEND_MESSAGES'],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {

    const [sub] = args

    try {

      if (sub === "enlarge") {

        const emojis = args.join(' ').match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi)

        if (!emojis) {
          return interaction
            .editReply({
              content: `${bot.error} • Enter A Valid Emoji in :emoji: form`
            })
            .then((msg) => {
         setTimeout(() => { 
        if(msg.deletable) msg.delete()
 }, bot.ms('30s'))
  });
        } else if (emojis) {
          if (emojis.length === 1) {
            const emote = interaction.options.getString('name')

            const emo = Util.parseEmoji(emote)

            if (!emo.name || !emo.id)
              return interaction.editReply(`${bot.error} Invalid emote argument`)

            const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
              emo.animated ? 'gif' : 'png'
              }`

            const img = `https://cdn.discordapp.com/emojis/${emo.id}.${
              emo.animated ? 'gif' : 'png'
              }`

            let embed = new MessageEmbed()
              .setColor(bot.color)
              .setAuthor({
                name: 'Comfi™ Enlarged Emoji',
iconURL:                interaction.user.avatarURL({ dynamic: true })
                         })
              .setImage(`${img}`)
              .setDescription(`${emo.name} ${emo.id}`)

            const row = new MessageActionRow().addComponents(
              new MessageButton()
                .setStyle('SECONDARY')
                .setCustomId(`backEmoji`)
                .setEmoji('884420649580363796')
                .setDisabled(true),
              new MessageButton()
                .setStyle('LINK')
                .setURL(`${res}`)
                .setLabel('Download!'),
              new MessageButton()
                .setStyle('SECONDARY')
                .setCustomId('forwardEmoji')
                .setEmoji('884420650549272586')
                .setDisabled(true)
            )

            interaction
              .followUp({
                embeds: [embed],
                components: [row]
              }).catch(() => null)
          } else if (emojis.length > 1) {
            const emote = interaction.options.getString('name')

            let pages = []

            emojis.forEach(emoji => {
              const emo = Util.parseEmoji(emoji)

              if (!emo.name || !emo.id)
                return interaction.editReply(
                  `${bot.error} Invalid emote argument`
                )

              const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
                emo.animated ? 'gif' : 'png'
                }`

              let embed = new MessageEmbed()
                .setColor(bot.color)
                .setAuthor({
                  name:'Enlarged Emoji',
iconURL:                  interaction.user.avatarURL({ dynamic: true })
                           })
                .setImage(`${res}`)
                .setDescription(`${emo.name} ${emo.id}`)

              pages.push(embed)
            })

          }
        }
      }
      if (sub === "find") {

        const name = interaction.options.getString("emote")

     if (name.toLowerCase() === "all" || "max") {
        let emojis = []
        let pages = []
               const emos = await bot.emojis.fetch()
          emosforEach(emo => {

            if (!emo.name || !emo.id)
  {             return interaction.editReply(
                `${bot.error} Invalid emote argument`
              )


            }            const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
              emo.animated ? 'gif' : 'png'
              }`

            let embed = new MessageEmbed()
              .setColor(bot.color)
              .setAuthor({
                name: 'Comfi™ Emojis',
iconURL:                interaction.user.avatarURL({ dynamic: true })
          })
              .setImage(`${res}`)
              .setDescription(`${emo.name} ${emo.id}`)

            pages.push(embed)
          })
          simplydjs.embedPages(bot, interaction, pages, {
            backEmoji: '884420649580363796',
            delEmoji: '891534962917007410',
            forwardEmoji: '884420650549272586',
            btncolor: 'SECONDARY',
            delcolor: 'SECONDARY',
            skipBtn: true,
            pgCount: true,
          })
            } else {
        
        let emojis = []
        const emos = bot.emojis.fetch()
          emos.filter(emoji => emoji.name.includes(name))
          .forEach(emoji => emojis.push(emoji));
        if (emojis.length > 1) {

          let pages = []

          emojis.forEach(emo => {

            if (!emo.name || !emo.id)
              return interaction.editReply(
                `${bot.error} Invalid emote argument`
              )

            const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
              emo.animated ? 'gif' : 'png'
              }`

            let embed = new MessageEmbed()
              .setColor(bot.color)
              .setAuthor({
                name: 'Comfi™ Enlarged Emoji',
iconURL:                interaction.user.avatarURL({ dynamic: true })
          })
              .setImage(`${res}`)
              .setDescription(`${emo.name} ${emo.id}`)

            pages.push(embed)
          })
          simplydjs.embedPages(bot, interaction, pages, {
            backEmoji: '884420649580363796',
            delEmoji: '891534962917007410',
            forwardEmoji: '884420650549272586',
            btncolor: 'SECONDARY',
            delcolor: 'SECONDARY',
            skipBtn: false,
            pgCount: true,
          })
        } else if (emojis.length === 1) {
          const emo = emojis[0]   
  if (!emo.name || !emo.id) {
            return interaction.editReply(`${bot.error} Invalid emote argumentt`)
  }    
          const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
            emo.animated ? 'gif' : 'png'
            }`

          const img = `https://cdn.discordapp.com/emojis/${emo.id}.${
            emo.animated ? 'gif' : 'png'
            }`

          let embed = new MessageEmbed()
            .setColor(bot.color)
            .setAuthor({
              name: 'Enlarged Emoji',
iconURL:              interaction.user.avatarURL({ dynamic: true })
        })
            .setImage(`${img}`)
            .setDescription(`${emo.name} ${emo.id}`)
;
          const row = new MessageActionRow().addComponents(
            new MessageButton()
              .setStyle('SECONDARY')
              .setCustomId(`backEmoji`)
              .setEmoji('884420649580363796')
              .setDisabled(true),
            new MessageButton()
              .setStyle('LINK')
              .setURL(`${res}`)
              .setLabel('Download!'),
            new MessageButton()
              .setStyle('SECONDARY')
              .setCustomId('forwardEmoji')
              .setEmoji('884420650549272586')
              .setDisabled(true)
          )

          interaction
            .followUp({
              embeds: [embed],
              components: [row]
            }).catch(() => null)
        } else return interaction
            .editReply({
              content: `${bot.error} **• Emoji not found !!**`
            })
            .then((msg) => {
  setTimeout(() => { if(msg.deletable) msg.delete() }, bot.ms('30s'))
  });
      }
      }
      }	catch (e) {
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
  }}    
  