const simplydjs = require('simply-djs');
const { MessageEmbed } = require('discord.js');
const bot = require('../../index');
const guilds = require('../../models/guild');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('interactionCreate', async (interaction, args) => {
  if (interaction.isButton()) {
    // Suggestions
    simplydjs.manageSug(interaction, {
      deny: { color: bot.color }, accept: { color: bot.color },
    });

    // Ticket
    const guild = await guilds.findOne({ guildId: interaction.guild.id });
    if (guild.ticket) {
      const support = guild.ticket_role;
      if (!support) return;

      const cat = guild.ticket_category;
      if (!cat) return;

      simplydjs.manageBtn(interaction, {
        ticketSys: {
          pingRole: support,
          category: cat,
          timed: false,
          embed: {
            title: 'Ticket Created',
            description: 'Staff Team will be here in a while, be patient and tell the details',
            color: bot.color,
            credit: false,
            footer: { text: 'Comfi™ Ticket System' },
          },
          buttons: {
            close: { style: 'SECONDARY', emoji: '796196175627419678' },
            reopen: { style: 'SECONDARY', emoji: '855791964975530004' },
            delete: { style: 'SECONDARY', emoji: '796196175627419678' },
            transcript: { style: 'SECONDARY', emoji: '905055261021061150' },
          },
        },
      }).then((log) => {
        const ch1 = interaction.guild.channels.cache.get(log.channelId);

        if (guild.modlog) {
          const embed = new MessageEmbed()
            .setTitle('Ticket Deleted !')
            .setDescription(`Ticket just got deleted by *<@${log.user.id}>* | Tag: ***${log.user.tag}***\n\nTicket Name: \`${ch1.name ? ch1.name : 'NONE'}\` | Ticket ID: \`${ch1.id ? ch1.id : 'NONE'}\`\nTicket Channel Topic: ${ch1.topic ? ch1.topic : 'NONE'}`)
            .setTimestamp()
            .setColor(bot.color)
            .setFooter({ text: 'Comfi™ Mod Logs' });
          const channel = interaction.guild.channels.cache.get(guild.mod_channel);
          if (channel) channel.send({ embeds: [embed] });
          // else console.log(channel)
        }
      });
    }
  }
});
