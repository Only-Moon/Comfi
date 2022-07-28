const bot = require('../../index')
const {
  Permissions,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  Discord
} = require('discord.js')
const guilds = require('../../models/guild')
const users = require('../../models/users')
const Client = require('../../models/Client')

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on('interactionCreate', async (interaction, args) => {
  // Slash Command Handling

  if (interaction.isCommand()) {

    const cmd = bot.slashCommands.get(interaction.commandName)

    if (!cmd.modal) {

      await interaction.deferReply({ ephemeral: cmd.ephemeral ? cmd.ephemeral : false }).catch(() => { })

    }

    if (!interaction.guild) return;

    const guild = await guilds.findOne({ guildId: interaction.guild.id })
    if (!guild) {
      await guilds.create({ guildId: interaction.guild.id })
    }

    if (!cmd) {
      return interaction
        .followUp({ content: `${bot.error} • An error has occured` })
        .catch(() => null)
    }

    const args = []

    for (let option of interaction.options.data) {
      if (option.type === 'SUB_COMMAND') {
        if (option.name) args.push(option.name)
        option.options ?.forEach(x => {
          if (x.value) args.push(x.value)
        })
			} else if (option.value) args.push(option.value)
    }

    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    )

    if (cmd.ownerOnly) {
      if (!bot.owners.includes(interaction.user.id))
        return await bot.errorEmbed(bot, interaction, `**You are not Authorized to use this Command !!**`
        )
    }

    const userp = new MessageEmbed()
      .setDescription(
        `${bot.error} You need \`${cmd.userperm ? cmd.userperm : []}\` Permissions`
      )
      .setColor('#FC7C7C')

    const userperm = interaction.member.permissions.has(cmd.userperm)

    if (!userperm) {
      return interaction.followUp({ embeds: [userp] }).catch(() => null)
    }
    const botp = new MessageEmbed()
      .setDescription(
        `${bot.error} • I need \`${cmd.botperm ? cmd.botperm : []}\` Permissions`
      )
      .setColor('#FC7C7C')

    const botperm = interaction.guild.me.permissions.has(cmd.botperm)
    if (!botperm) {
      return interaction.followUp({ embeds: [botp] }).catch(() => null)
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    )

    if (interaction.user.bot) return;

    const clientSchema = await Client.findOne({ clientId: bot.user.id })
    if (clientSchema.blackListedUsers.includes(interaction.user.id)) {
      const blkuser = new MessageEmbed()
        .setDescription(
          `${bot.error} You are blacklisted from using <@${
          bot.user.id
          }>'s commands`
        )
        .setColor('#FC7C7C')

      return await interaction.editReply({ embeds: [blkuser] }).then((msg) => {
        setTimeout(() => { if (!msg.deleted) msg.delete() }, bot.ms('60s'))
      });
    }

    if (clientSchema.blackListedServers.includes(interaction.guild.id)) {
      const blkguild = new MessageEmbed()
        .setDescription(
          `${bot.error} This guild is blacklisted from using <@${
          bot.user.id
          }>'s commands`
        )
        .setColor('#FC7C7C')

      return await interaction.editReply({ embeds: [blkguild] }).then((msg) => {
        setTimeout(() => { if (!msg.deleted) msg.delete() }, bot.ms('60s'))
      });;
    }

    if (clientSchema.blackListedCmds.includes(cmd.name) && !owners.includes(interaction.user.id)) {
      return await bot.errorEmbed(bot, interaction, `**This command has been disabled by the developer !**`)
    }

    if (cmd.nsfw && !interaction.channel.nsfw) {

      return await bot.errorEmbed(bot, interaction, `**Nsfw Command can't be used in an Non-NSFW Channel**`)

    }

    if (!interaction.channel.viewable) {

      const channel = new MessageEmbed()
        .setDescription(
          `${bot.error} • I can't see this channel`
        )
        .setColor('#FC7C7C')

      return await interaction.editReply({ embeds: [channel] }).then((msg) => {
        setTimeout(() => { if (!msg.deleted) msg.delete() }, bot.ms('30s'))
      });

    }

    //if (cmd.premium) {}

    async function commandExecute() {
      try {
        if (cmd) cmd.run(bot, interaction, args)
      } catch (e) {
        await bot.senderror(interaction, e)
      }
    }

    const user = await users.findOne({ userId: interaction.user.id })
    if (!user) {
      await users.create({ userId: interaction.user.id })
    }

    const c1 = bot.channels.cache.get('890580695192305696')
    const c2 = bot.channels.cache.get('932596444278423563');

    const logsChannel = c1 ? c1 : c2;

    const logsEmbed = new MessageEmbed()
      .setDescription(
        ` > <a:tick:890113862706266112> • __Command:__ **${
        cmd.name
        }**!\n > <a:tick:890113862706266112> • __Args :__ **${args.length === 0 ? args : "Not Found"}** \n\n > <a:emoji_87:883033003574579260> • __Guild:__ **${
        interaction.guild ? interaction.guild.name : 'dm'
        }**\n > <a:emoji_87:883033003574579260> • __Id:__ **${
        interaction.guild ? interaction.guild.id : 'dm'
        }**\n ><a:wing_cs:883032991293653062> • __User:__ **${interaction.user ? interaction.user.username : "Not Found"}**\n ><a:wing_cs:883032991293653062> • __Id:__ **${interaction.user ? interaction.user.id : "Not Found"}**`
      )
      .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
      .setColor(bot.color)
      .setFooter({ text: `Used by ${interaction.user.username}` })
      .setTimestamp();

    if (cmd.cooldown) {
      const current_time = Date.now()
      const cooldown_amount = cmd.cooldown * 1000

      users.findOne(
        {
          userId: interaction.member.id,
          cmd: cmd.name
        },
        async (err, data) => {
          if (data) {
            const expiration_time = data.time + cooldown_amount

            if (current_time < expiration_time) {
              const time_left = (expiration_time - current_time) / 1000

              if (time_left.toFixed(1) >= 3600) {
                let hour = time_left.toFixed(1) / 3600
                let hrs = new MessageEmbed()
                  .setDescription(
                    `${bot.error} Please wait ${parseInt(
                      hour
                    )} more hours before using \`${cmd.name}\`!`
                  )
                  .setColor('#FF8080')
                return interaction.followUp({ embeds: [hrs] }).catch(() => null)
              }
              if (time_left.toFixed(1) >= 60) {
                let minute = time_left.toFixed(1) / 60
                let min = new MessageEmbed()
                  .setDescription(
                    `${bot.error} Please wait ${parseInt(
                      minute
                    )} more minutes before using \`${cmd.name}\`!`
                  )
                  .setColor('#FF8080')
                return interaction.followUp({ embeds: [min] }).catch(() => null)
              }
              let seconds = time_left.toFixed(1)
              let sec = new MessageEmbed()
                .setDescription(
                  `${bot.error} Please wait ${parseInt(
                    seconds
                  )} more seconds before using \`${cmd.name}\`!`
                )
                .setColor('#FF8080')
              return interaction.followUp({ embeds: [sec] }).catch(() => null)
            } else {
              await users.findOneAndUpdate(
                {
                  userId: interaction.member.id,
                  cmd: cmd.name
                },
                {
                  time: current_time
                }
              )
              commandExecute()
              if (logsChannel) {
                logsChannel.send({ embeds: [logsEmbed] }).catch(() => null)
              }
            }

          } else {
            commandExecute()
            if (logsChannel) {
              logsChannel.send({ embeds: [logsEmbed] }).catch(() => null)
            }

            users.create({
              userId: interaction.member.id,
              cmd: cmd.name,
              time: current_time,
              cooldown: cmd.cooldown
            })
          }
        }
      )
    } else {
      commandExecute()
      if (logsChannel) {
        logsChannel.send({ embeds: [logsEmbed] }).catch(() => null)
      }
    }
  }

  // Context Menu Handling

  if (interaction.isContextMenu()) {
    await interaction.deferReply({ ephemeral: false })

    const command = bot.slashCommands.get(interaction.commandName)

    const logsChannel = bot.channels.cache.get(
      '890580695192305696' || '782566659088842762'
    )

    const logsEmbed = new MessageEmbed()
      .setDescription(
        ` > <a:tick:890113862706266112> • __Command:__ **${
        command.name
        }**!\n > <a:emoji_87:883033003574579260> • __Guild:__ **${
        interaction.guild ? interaction.guild.name : 'dm'
        }**\n > <a:emoji_87:883033003574579260> • __Id:__ **${
        interaction.guild ? interaction.guild.id : 'dm'
        }**`
      )
      .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
      .setColor(bot.color)
      .setFooter({ text: `Used by ${interaction.user.username}` })
      .setTimestamp();

    try {
      if (command) {
        command.run(bot, interaction)
        if (logsChannel) {
          logsChannel.send({ embeds: [logsEmbed] }).catch(() => null)
        }
      }
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  }
})
