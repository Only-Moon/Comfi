const { EmbedBuilder, AuditLogEvent } = require('discord.js');
const bot = require('../../index');
const guilds = require('../../models/guild');

/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('channelDelete', async (channel) => {
  if (!channel.guild) return;
  const guild = await guilds.findOne({ guildId: channel.guild.id });

  if (guild.welcome) {
    if (guild.welcome_channel === channel.id) {
      await guilds.findOneAndUpdate({ guildId: channel.guild.id }, {
        welcome: false,
        welcome_channel: 'NONE',
        welcome_dmuser: false,
        welcome_message: 'Welcome {{user#mention}}',
        welcome_embed: false,
      });
    }
  }

  if (guild.verification) {
    if (guild.verification_channel === channel.id) {
      await guilds.findOneAndUpdate({ guildId: channel.guild.id }, {
        verification: false,
        verification__channel: 'NONE',
        verification_role: 'NONE',
        verification_message: 'Please type the words below to gain access to the server.',
      });
    }
  }

  if (guild.leave) {
    if (guild.leave_channel === channel.id) {
      await guilds.findOneAndUpdate({ guildId: channel.guild.id }, {
        leave: false,
        leave_channel: 'NONE',
        leave_dmuser: false,
        leave_message: 'Goodbye {{user#mention}}',
        leave_embed: false,
      });
    }
  }

  if (guild.boost) {
    if (guild.boost_channel === channel.id) {
      await guilds.findOneAndUpdate({ guildId: channel.guild.id }, {
        boost: false,
        boost_channel: 'NONE',
        boost_message: '{user} just boosted {server}',
      });
    }
  }

  if (guild.suggestions) {
    if (guild.suggestions_channel === channel.id) {
      await guilds.findOneAndUpdate({ guildId: channel.guild.id }, {
        suggestions: false,
        suggestions_channel: 'NONE',
      });
    }
  }

  if (guild.chatbot) {
    if (guild.chatbot_channel === channel.id) {
      await guilds.findOneAndUpdate({ guildId: channel.guild.id }, {
        chatbot: false,
        chatbot_channel: 'NONE',
      });
    }
  }

  if (guild.confession) {
    if (guild.confess_channel === channel.id) {
      await guilds.findOneAndUpdate({ guildId: channel.guild.id }, {
        confession: false,
        confess_channel: 'NONE',
      });
    }
  }

  if (guild.ticket) {
    if (guild.ticket_channel === channel.id) {
      await guilds.findOneAndUpdate({ guildId: channel.guild.id }, {
        ticket: false,
        ticket_channel: 'NONE',
      });
    }
  }

  if (guild.leveling) {
    if (guild.leveling_channel === channel.id) {
      await guilds.findOneAndUpdate({ guildId: channel.guild.id }, {
        leveling: false,
        leveling_channel: 'NONE',
        leveling_message: 'Congrats {{user.mention}} on reaching level {{level}}',
        leveling_roles: [],
      });
    }
  }

  if (guild.modlog) {
    if (guild.mod_channel === channel.id) {
      await guilds.findOneAndUpdate({ guildId: channel.guild.id }, {
        modlog: false,
        mod_channel: 'NONE',
      });
    }
  }

  if (guild.logging) {
    if (guild.logging_channel === channel.id) {
      await guilds.findOneAndUpdate({ guildId: channel.guild.id }, {
        logging: false,
        logging_channel: 'NONE',
      });
    } if (!channel.guild.members.me.permissions.has(bot.functions.fixPermissions('VIEW_AUDIT_LOG'))) return;

    const AuditLogFetch = await channel.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.ChannelDelete });
    const Entry = AuditLogFetch.entries.first();
    const embed = new EmbedBuilder()
      .setTitle('Channel Deleted!')
      .setColor(bot.color)
      .setDescription(`> <a:stars_aesthetic:883033007836000308> • **Author:** <@${Entry.executor.id}>`)
      .addFields(
        { name: 'Channel', value: `> <a:zzzghostheart:883017884014637066> • **Name:** ${channel.name}\n > <a:zzzghostheart:883017884014637066> • **ID:** \`${channel.id}\`` },
      )
      .setFooter({ text: 'Comfi™ Logging' })
      .setTimestamp();

    const logsChannel = channel.guild.channels.cache.find((c) => c.id === guild.logging_channel);
    if (logsChannel) {
      logsChannel.send({ embeds: [embed] });
    }
  }
});
