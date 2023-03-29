const {
  Permissions,
  EmbedBuilder,
  ButtonBuilder,
  InteractionType,
  Discord,
  ApplicationCommandOptionType,
} = require('discord.js');
const bot = require('../../index');
const guilds = require('../../models/guild');
const users = require('../../models/users');
const Client = require('../../models/Client');

/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('interactionCreate', async (interaction, args) => {
  // Slash Command Handling

  if (interaction.type === InteractionType.ApplicationCommand) {
      
    const cmd = bot.slashCommands.get(interaction.commandName);

bot.statcord.postCommand(cmd.name, interaction.user.id, bot)
      
    if (!cmd.modal) {
      await interaction.deferReply({ ephemeral: cmd.ephemeral ? cmd.ephemeral : false }).catch(() => { });
    }

    if (!interaction.guild) return;

    const guild = await guilds.findOne({ guildId: interaction.guild.id });
    if (!guild) {
      await guilds.create({ guildId: interaction.guild.id });
    }

    if (!cmd) {
      return interaction
        .followUp({ content: `${bot.error} • An error has occured` })
        .catch(() => null);
    }

    const args = [];

    for (const option of interaction.options.data) {
      if (option.type === ApplicationCommandOptionType.Subcommand) {
        if (option.name) args.push(option.name);
        option.options?.forEach((x) => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }

    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id,
    );

    if (cmd.ownerOnly) {
      if (!bot.owners.includes(interaction.user.id)) {
        return await bot.errorEmbed(bot, interaction, '**You are not Authorized to use this Command !!**');
      }
    }

    const userperm = interaction.member.permissions.has(cmd.userperm || []);

    if (!userperm) {
      return await bot.errorEmbed(bot, interaction, `You need \`${cmd.userperm ? cmd.userperm : []}\` permission's`);
    }

    const botperm = interaction.guild.members.me.permissions.has(cmd.botperm || []);
    if (!botperm) {
      return await bot.errorEmbed(bot, interaction, `I need \`${cmd.botperm ? cmd.botperm : []} \` permission's`);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id,
    );

    if (interaction.user.bot) return;

    const clientSchema = await Client.findOne({ clientId: bot.user.id });
    if (clientSchema.blackListedUsers.includes(interaction.user.id)) {
      return await bot.errorEmbed(bot, interaction, `You are blacklisted from using <@${bot.user.id}>'s commands`);
    }

    if (clientSchema.blackListedServers.includes(interaction.guild.id)) {
      return await bot.errorEmbed(bot, interaction, `You are blacklisted from using <@${bot.user.id}>'s commands`);
    }

    if (clientSchema.blackListedCmds.includes(cmd.name) && !owners.includes(interaction.user.id)) {
      return await bot.errorEmbed(bot, interaction, '**This command has been disabled by the developer !**');
    }

    if (cmd.nsfw && !interaction.channel.nsfw) {
      return await bot.errorEmbed(bot, interaction, '**Nsfw Command can\'t be used in an Non-NSFW Channel**');
    }

    if (!interaction.channel.viewable) {
      return await bot.errorEmbed(bot, interaction, 'I dont have access to view messages of this channel');
    }

    // if (cmd.premium) {}

    async function commandExecute() {
      try {
        if (cmd) cmd.run(bot, interaction, args);
      } catch (e) {
        await bot.senderror(interaction, e);
      }
    }

    const user = await users.findOne({ userId: interaction.user.id });
    if (!user) {
      await users.create({ userId: interaction.user.id });
    }

    const c1 = bot.channels.cache.get('890580695192305696');
    const c2 = bot.channels.cache.get('932596444278423563');

    const logsChannel = c1 || c2;

    const logsEmbed = new EmbedBuilder()
      .setDescription(
        ` > <a:tick:890113862706266112> • __Command:__ **${
          cmd.name
        }**!\n > <a:tick:890113862706266112> • __Args :__ **${args.length !== 0 ? args : 'Not Found'}** \n\n > <a:emoji_87:883033003574579260> • __Guild:__ **${
          interaction.guild ? interaction.guild.name : 'dm'
        }**\n > <a:emoji_87:883033003574579260> • __Id:__ **${
          interaction.guild ? interaction.guild.id : 'dm'
        }**\n > <a:wing_cs:883032991293653062> • __User:__ **${interaction.user ? interaction.user.username : 'Not Found'}**\n >  <a:wing_cs:883032991293653062> • __Id:__ **${interaction.user ? interaction.user.id : 'Not Found'}**`,
      )
      .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
      .setColor(bot.color)
      .setFooter({ text: `Used by ${interaction.user.username}` })
      .setTimestamp();

    if (cmd.cooldown) {
      const current_time = Date.now();
      const cooldown_amount = cmd.cooldown * 1000;

      users.findOne(
        {
          userId: interaction.member.id,
          cmd: cmd.name,
        },
        async (err, data) => {
          if (data) {
            const expiration_time = data.time + cooldown_amount;

            if (current_time < expiration_time) {
              const time_left = (expiration_time - current_time) / 1000;

              if (time_left.toFixed(1) >= 3600) {
                const hour = time_left.toFixed(1) / 3600;
                return await bot.errorEmbed(bot, interaction, ` Please wait ${parseInt(
                  hour,
                )} more hours before using \`${cmd.name}\`!`);
              }
              if (time_left.toFixed(1) >= 60) {
                const minute = time_left.toFixed(1) / 60;
                return await bot.errorEmbed(bot, interaction, `Please wait ${parseInt(
                  minute,
                )} more minutes before using \`${cmd.name}\`!`);
              }
              const seconds = time_left.toFixed(1);
              return await bot.errorEmbed(bot, interaction, `lease wait ${parseInt(
                seconds,
              )} more seconds before using \`${cmd.name}\`!`);
            }
            await users.findOneAndUpdate(
              {
                userId: interaction.member.id,
                cmd: cmd.name,
              },
              {
                time: current_time,
              },
            );
            commandExecute();
            if (logsChannel) {
              logsChannel.send({ embeds: [logsEmbed] }).catch(() => null);
            }
          } else {
            commandExecute();
            if (logsChannel) {
              logsChannel.send({ embeds: [logsEmbed] }).catch(() => null);
            }

            users.create({
              userId: interaction.member.id,
              cmd: cmd.name,
              time: current_time,
              cooldown: cmd.cooldown,
            });
          }
        },
      );
    } else {
      commandExecute();
      if (logsChannel) {
        logsChannel.send({ embeds: [logsEmbed] }).catch(() => null);
      }
    }
  }

  // Context Menu Handling

  if (interaction.isContextMenuCommand()) {
    await interaction.deferReply({ ephemeral: false });

    const command = bot.slashCommands.get(interaction.commandName);

    const logsChannel = bot.channels.cache.get(
      '890580695192305696' || '782566659088842762',
    );

    const logsEmbed = new EmbedBuilder()
      .setDescription(
        ` > <a:tick:890113862706266112> • __Context Command:__ **${
          cmd.name
        }**!\n > <a:tick:890113862706266112> • __Args :__ **${args.length !== 0 ? args : 'Not Found'}** \n\n > <a:emoji_87:883033003574579260> • __Guild:__ **${
          interaction.guild ? interaction.guild.name : 'dm'
        }**\n > <a:emoji_87:883033003574579260> • __Id:__ **${
          interaction.guild ? interaction.guild.id : 'dm'
        }**\n > <a:wing_cs:883032991293653062> • __User:__ **${interaction.user ? interaction.user.username : 'Not Found'}**\n >  <a:wing_cs:883032991293653062> • __Id:__ **${interaction.user ? interaction.user.id : 'Not Found'}**`,
      )
      .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
      .setColor(bot.color)
      .setFooter({ text: `Used by ${interaction.user.username}` })
      .setTimestamp();

    try {
      if (command) {
        command.run(bot, interaction);
        if (logsChannel) {
          logsChannel.send({ embeds: [logsEmbed] }).catch(() => null);
        }
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  }
});
