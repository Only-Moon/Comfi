/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, EmbedBuilder } = require('discord.js');
const { pagination } = require('../../functions/btnPage');

module.exports = {
  name: 'serverlist',
  description: 'Displays the list of servers the bot is in!',
  ownerOnly: true,
  userperm: ['ADMINISTRATOR'],
  botperm: ['MANAGE_SERVER'],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    const guilds = bot.guilds.cache.sort((a, b) => b.memberCount - a.memberCount);

    const pages = [];

    guilds.forEach((guild) => {
      const embed = new EmbedBuilder()
        .setTitle(`Guilds for ${bot.user.username}`)
        .setColor(bot.color)
        .setFooter({ text: `Requested by ${interaction.user.tag}` })
        .addFields(
          {
            name: 'Guild Name 》',
            value: `${guild.name}`,
            inline: true,
          },
          {
            name: 'Guild Id 》',
            value: `${guild.id}`,
            inline: true,
          },
          {
            name: 'Member Count 》',
            value: `${guild.memberCount}`,
            inline: true,
          },
        );

      pages.push(embed);
    });

    await pagination(interaction, pages);
  },
};
