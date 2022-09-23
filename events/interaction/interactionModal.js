const {
  Permissions,
  EmbedBuilder,
  InteractionType,
  ButtonStyle,
  ButtonBuilder,
  ActionRowBuilder,
  Discord,
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
  try {
    if (interaction.type === InteractionType.ModalSubmit) {
      const cmd = bot.slashCommands.get(interaction.commandName);

      if (interaction.customId === 'Bug') {
        await interaction.deferReply({ ephemeral: true });

        const title = interaction.fields
          .getTextInputValue('title')
          .split('')
          .slice(0, 100)
          .join('');

        const desc = interaction.fields
          .getTextInputValue('description')
          .split('')
          .slice(0, 2000)
          .join('');

        const { member } = interaction;
        const reportCh = bot.channels.cache.get(
          '889149873893539900',
        ) || bot.channels.cache.get('863684464176922664');
        const owner = bot.users.cache.get('753974636508741673');

        const reportEmbed = new EmbedBuilder()
          .setTitle('Comfi™ Bug Report')
          .setDescription(
            `**Author :**\n> ${member.user.username} \n**Report Title :**\n> ${title} \n**Report Description:**\n\`\`\`${desc}\`\`\``,
          )
          .setFooter({ text: `Sent From ${member.guild.id}` })
          .setThumbnail(member.user.avatarURL({ dynamic: true }))
          .setTimestamp()
          .setColor(bot.color);

        if (reportCh) {
          reportCh.send({ embeds: [reportEmbed] });
        } else if (owner) {
          await owner.send({ embeds: [reportEmbed] });
        }

        return await bot.successEmbed(bot, interaction, 'Bug Report has been sent to the developers!');
      }
      if (interaction.customId === 'wordleWord') {
        const input = interaction.fields.getTextInputValue('wordleWord');
        if (input) {
          const options = {
            yellow: '🟨',
            grey: '⬜',
            green: '🟩',
            black: '⬛',
          };

          const guess = input.toLowerCase();

          let result = '';

          const row = interaction?.message?.components;
          const solution = row[0]?.components[0]?.customId?.slice(0, 5);
          const tries = row[0]?.components[0]?.customId?.slice(5, 6);

          for (let i = 0; i < guess.length; i++) {
            const guessLetter = guess?.charAt(i);
            const solutionLetter = solution?.charAt(i);
            if (guessLetter === solutionLetter) {
              result = result.concat(options.green);
            } else if (solution?.indexOf(guessLetter) != -1) {
              result = result.concat(options.yellow);
            } else {
              result = result.concat(options.grey);
            }
          }

          let embeddesk = interaction?.message?.embeds[0]?.description;
          embeddesk = JSON.stringify(embeddesk.split('\n'));
          const gamedesc = JSON.parse(embeddesk);

          const game = interaction?.message?.embeds[0];

          if (result === '🟩🟩🟩🟩🟩') {
            gamedesc[tries] = `${result} - ${guess}`;
            await interaction.update({ embeds: [game.setDescription(gamedesc.join('\n'))] }).catch((err) => { });
            await interaction.followUp({ content: 'You Got The Correct Word', ephemeral: true }).catch((err) => { });
          } else if (Number(tries) === 6 || Number(tries) + 1 === 7) {
            await interaction.update({ embeds: [game.setFooter({ text: `You Used Your 6 Tries The Correct Word Was ${solution}` })] }).catch((err) => { });
          } else {
            gamedesc[tries] = `${result} - ${guess}`;
            if (!row[0]?.components[0]) return;
            row[0].components[0].customId = `${solution}${Number(tries) + 1}`;
            await interaction.update({ components: row, embeds: [game.setDescription(gamedesc.join('\n'))] });
          }
        }
      }
    }
  } catch (e) {
    await bot.senderror(interaction, e);
  }
});
