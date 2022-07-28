/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

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
  directory: "info",
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
          description: `enter a name to search emote or \`all\` to get list of all emotes`,
          type: "STRING",
          required: true
        },
        {
          name: "guild",
          description: "search emote from a particular server using name or id",
          type: "STRING",
          required: false
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
          return await bot.errorEmbed(bot, interaction, `**Enter A Valid Emoji in** \`:emoji:\` **form not** \`<:emojiname:emojiid>\``
          );
        }

        if (emojis.length === 1) {
          const emote = interaction.options.getString('name')

          const emo = Util.parseEmoji(emote)

          if (!emo.name || !emo.id) {
            return await bot.errorEmbed(bot, interaction, `**Invalid emote argument**`)
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
              name: 'Comfi™ Enlarged Emoji',
              iconURL: interaction.user.avatarURL({ dynamic: true })
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

          await interaction
            .followUp({
              embeds: [embed],
              components: [row]
            }).catch(() => null)
        } else if (emojis.length > 1) {
          const emote = interaction.options.getString('name')

          let pages = []

          emojis.forEach(emoji => {
            const emo = Util.parseEmoji(emoji)

            if (!emo.name || !emo.id) {
              return interaction.editReply({
                content: `${bot.error} • **Invalid emote argument**`
              })
            }

            const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
              emo.animated ? 'gif' : 'png'
              }`

            let embed = new MessageEmbed()
              .setColor(bot.color)
              .setAuthor({
                name: 'Enlarged Emoji',
                iconURL: interaction.user.avatarURL({ dynamic: true })
              })
              .setImage(`${res}`)
              .setDescription(`${emo.name} ${emo.id}`)

            pages.push(embed)
          })

          simplydjs.embedPages(interaction, pages, {
            buttons: {
              firstBtn: { style: "SECONDARY", emoji: "884420649580363796" },
              nextBtn: { style: "SECONDARY", emoji: "884421235965059113" },
              backBtn: { style: "SECONDARY", emoji: "884421503205134356" },
              lastBtn: { style: "SECONDARY", emoji: "884420650549272586" },
              deleteBtn: { style: "SECONDARY", emoji: "891534962917007410" }
            },
            skips: true,
            count: true
          })

        } else return interaction.editReply({ content: `${bot.error} **• An error occured**` })

      }
      if (sub === "find") {

        const name = interaction.options.getString("emote")
        const guildd = interaction.options.getString("guild")
        const guild = bot.guilds.cache.find(g => g.id === guildd) || bot.guilds.cache.find(g => g.name === guildd)
        let emoss;

        if (name.toLowerCase() === "all") {
          let emojis = []
          let pages = []


          if (guild) {
            emoss = guild
          } else {
            emoss = bot
          }

          const emos = emoss.emojis.cache
            .filter(e => e.name != "steal")
            .forEach(async (emo) => {

              if (!emo.name || !emo.id) {
                return await bot.errorEmbed(bot, interaction, `**Invalid emote argument**`
                )


              } const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
                emo.animated ? 'gif' : 'png'
                }`

              let embed = new MessageEmbed()
                .setColor(bot.color)
                .setAuthor({
                  name: 'Comfi™ Emojis',
                  iconURL: bot.user.avatarURL({ dynamic: true })
                })
                .setImage(`${res}`)
                .setFooter({ text: `This emoji is from ${emo.guild.name}`, iconURL: emo.guild.iconURL({ dynamic: true }) })
                .setDescription(`${emo.name} ${emo.id}`)

              pages.push(embed)
            })

          simplydjs.embedPages(interaction, pages, {
            buttons: {
              firstBtn: { style: "SECONDARY", emoji: "884420649580363796" },
              nextBtn: { style: "SECONDARY", emoji: "884421235965059113" },
              backBtn: { style: "SECONDARY", emoji: "884421503205134356" },
              lastBtn: { style: "SECONDARY", emoji: "884420650549272586" },
              deleteBtn: { style: "SECONDARY", emoji: "891534962917007410" }
            },
            skips: true,
            count: true
          })

        } else {

          let emojis = []
          if (guild) {
            emoss = guild
          } else {
            emoss = bot
          }
          const emos = emoss.emojis.cache
            .filter(emoji => emoji.name.includes(name) && !emoji.name.includes("steal"))
            .forEach(emoji => emojis.push(emoji));
          if (emojis.length > 1) {

            let pages = []

            emojis.forEach(async (emo) => {

              if (!emo.name || !emo.id) {
                return await bot.errorEmbed(bot, interaction, `**Invalid emote argument**`
                )
              }

              const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
                emo.animated ? 'gif' : 'png'
                }`

              let embed = new MessageEmbed()
                .setColor(bot.color)
                .setAuthor({
                  name: 'Comfi™ Emojis',
                  iconURL: bot.user.avatarURL({ dynamic: true })
                })
                .setImage(`${res}`)
                .setDescription(`${emo.name} ${emo.id}`)
                .setFooter({ text: `This emoji is from ${emo.guild.name}`, iconURL: emo.guild.iconURL({ dynamic: true }) })

              pages.push(embed)
            })

            simplydjs.embedPages(interaction, pages, {
              buttons: {
                firstBtn: { style: "SECONDARY", emoji: "884420649580363796" },
                nextBtn: { style: "SECONDARY", emoji: "884421235965059113" },
                backBtn: { style: "SECONDARY", emoji: "884421503205134356" },
                lastBtn: { style: "SECONDARY", emoji: "884420650549272586" },
                deleteBtn: { style: "SECONDARY", emoji: "891534962917007410" }
              },
              skips: true,
              count: true
            })

          } else if (emojis.length === 1) {
            const emo = emojis[0]
            if (!emo.name || !emo.id) {
              return await bot.errorEmbed(bot, interaction, `**Invalid emote argument**`)
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
                name: 'Comfi™ Emojis',
                iconURL: bot.user.avatarURL({ dynamic: true })
              })
              .setImage(`${img}`)
              .setDescription(`${emo.name} ${emo.id}`)
              .setFooter({ text: `This emoji is from ${emo.guild.name}`, iconURL: emo.guild.iconURL({ dynamic: true }) });
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

            await interaction
              .followUp({
                embeds: [embed],
                components: [row]
              }).catch(() => null)
          } else return await bot.errorEmbed(bot, interaction, ` **• Emoji not found !!**`
          ).then((msg) => {
            setTimeout(() => { if (msg?.deletable) msg.delete() }, bot.ms('30s'))
          });
        }
      }
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
}
