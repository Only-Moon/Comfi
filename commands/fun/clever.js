/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'clever',
  description: 'clever rate user',
  directory: 'fun',
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.User,
      description: 'The user',
      name: 'user',
      required: false,
    },
  ],
  userperm: [''],
  botperm: [''],

  run: async (bot, interaction, args) => {
    try {
      const member = interaction.guild.members.members.cache.get(args[0]) || interaction.member;

      const rng = Math.floor(Math.random() * 101);

      const cleverembed = new EmbedBuilder()

        .setTitle('CLEVER Rate 💡')

        .setDescription(`**__${member.user.username}#${member.user.discriminator}__** ➡️${rng}**% Clever!!**`)

        .setColor(bot.color)

        .setThumbnail('https://www.poetry4kids.com/wp-content/uploads/2008/05/im-clever-whenever.png')

        .setFooter({ text: member.user.username, iconURL: member.user.avatarURL({ dynamic: true }) })

        .setTimestamp();

      await interaction.editReply({ embeds: [cleverembed] });
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
