const bot = require('../../index')
const simplydjs = require('simply-djs')
const guilds = require('../../models/guild')
const users = require('../../models/users')
const { Collection, MessageEmbed } = require('discord.js')
const fetch = require("node-fetch")

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on('messageCreate', async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.author) return;

  try {

    const guild = await guilds.findOne({ guildId: message.guild.id })
    if (!guild) {
      await guilds.create({ guildId: message.guild.id })
    }

    require(`../../functions/afk`)(message)

    if (guild.leveling) {
      if (message.author.bot) return;
      const userOnLevel = await users.findOne({
        userId: message.author.id,
        guildId: message.guild.id
      })
      if (!userOnLevel) {
        await users.create({
          userId: message.author.id,
          guildId: message.guild.id
        })
      }

      require(`../../functions/leveling`)(message, bot)
    }

    const reg = new RegExp("^(https?:\\/\\/)?" + "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + "((\\d{1,3}\\.){3}\\d{1,3}))" + "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + "(\\?[;&a-z\\d%_.~+=-]*)?" + "(\\#[-a-z\\d_]*)?$", "i")

    if (reg.test(message.content)) {

      const data = JSON.stringify({
        message: message.content
      })

      let result = await fetch(`https://ash-anti-fish.bitflow.dev/check`, {
        method: 'POST',
        headers: {
          "User-Agent": "Comfi",
          "Content-Type": "application/json"
        },
        body: data
      })
      result = await result.json()

      if (guild.anti_scam && result.match) {

        await message.delete()
        const time = guild.anti_scam_time
        const embed = new MessageEmbed()
          .setTitle(`Scam Link Detected !!`)
          .setColor(bot.color)
          .setDescription(`**${message.author.tag}** sent a scam link/said a bad word: ||${message.content.toLowerCase()}|| and has been timedout for ${time ? bot.ms(time) : "12 hours"}`)
          .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
          .setFooter({ text: `This is a new feature, report to my support server if it doesn't work properly <3`, iconURL: bot.user.displayAvatarURL({ dynamic: true }) });

        await message.channel.send({ embeds: [embed] }).then((msg) => {
          setTimeout(() => { if (!msg.deleted) msg.delete() }, bot.ms('2m'))
        });

        // Timeout the User for 12h
        const member = message.guild.members.cache.get(message.author)

        if (message.member.moderatable) {
          await message.member.timeout(time ? time : 43200000, "Sending Scam links").catch(() => null)

          const embed2 = new MessageEmbed()
            .setTitle(`Scam Link Detected !!`)
            .setDescription(`Dear ${message.author.tag}\nYou have received this because you have sent a not-allowed message.\nServer: **${message.guild.name}**\nMessage: ||${message.content.toLowerCase()}||\n\nYour timeout will be removed automatically in exactly **${time ? bot.ms(time) : "12 Hours"}**.`)
            .setColor(bot.color)
            .setFooter({ text: `To: ${message.author.username}`, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setTimestamp();

          await message.author.send({ embeds: [embed2] })
        }

        await bot.modlog({
          Member: message.member,
          Action: "Timeout",
          Reason: `**Timeout\'ed for sending: ** ||${message.content.toLowerCase()}||`
        }, message)
      }
    }

    if (guild.nqn) {
      simplydjs.nqn(message)
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

    message.channel.send({
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

})