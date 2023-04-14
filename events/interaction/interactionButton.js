const {
  EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle,
} = require('discord.js');
const bot = require('../../index');

const { clientID } = process.env;

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('interactionCreate', async (interaction, args) => {
  if (interaction.isButton()) {
    if (interaction.customId == 'inviteyes') {
      await interaction.deferUpdate();

      const inviteyb = new EmbedBuilder()
        .setTitle('Thanks for using Comfi - the Multipurpose bot!')
        .setDescription(
          `Here Is My Invite Links: \nServer Moderator: **[Click Me](https://discord.com/api/oauth2/authorize?client_id=${clientID}&permissions=261455474551&scope=bot%20applications.commands)** \nServer Helper: **[Click Me](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot%20applications.commands&permissions=4294967287)** \n\nRecommended: **[Click Me](https://discord.com/api/oauth2/authorize?client_id=${clientID}&permissions=8&scope=bot%20applications.commands)**`,
        )
        .setColor('#A2FCAB');

      const joindsc = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel('Join Our Support Server!')
        .setURL(`${bot.dash}support`);

      const row = new ActionRowBuilder().addComponents(joindsc);

      await interaction
        .editReply({ embeds: [inviteyb], components: [row] })
        .catch(() => null);
    } else if (interaction.customId === 'inviteno') {
      await interaction.deferUpdate();
      const noooyb = new EmbedBuilder()
        .setTitle('Okay Then')
        .setDescription('But Please Join Our Support Server!')
        .setColor('#FE7676');

      const joindscc = new ButtonBuilder()
        .setStyle(ButtonStyle.Link)
        .setLabel('Join Our Support Server!')
        .setURL(`${bot.dash}support`);

      const row1 = new ActionRowBuilder().addComponents(joindscc);

      await interaction
        .editReply({ embeds: [noooyb], components: [row1] })
        .catch(() => null);
    }
  }
});
