/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { ActionRowBuilder, ModalBuilder, TextInputStyle, ButtonStyle, TextInputBuilder, ButtonBuilder, EmbedBuilder, CommandInteraction } = require("discord.js")

module.exports = {
  name: 'wordle',
  description: 'Play a game of wordle',
  ownerOnly: false,
  userperm: [""],
  botperm: [""],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    try {
      const gamedesc = [
        `⬛⬛⬛⬛⬛ - Empty`,
        `⬛⬛⬛⬛⬛ - Empty`,
        `⬛⬛⬛⬛⬛ - Empty`,
        `⬛⬛⬛⬛⬛ - Empty`,
        `⬛⬛⬛⬛⬛ - Empty`,
        `⬛⬛⬛⬛⬛ - Empty`
      ]

      const modal = new ModalBuilder()
        .setCustomId('wordle')
        .setTitle('Wordle');

      const word = new TextInputBuilder()
        .setCustomId('wordleWord')
        .setLabel("What's your word?")
        .setStyle(TextInputStyle.Short)
        .setMinLength(5)
        .setMaxLength(5)
        .setRequired(true);

      const firstActionRow = new ActionRowBuilder().addComponents(word);

      modal.addComponents(firstActionRow);

      let words = ["books", "apple", "color", "ready", "house", "table", "light", "sugar", "goals", "sweat", "water", "drink", "sport", "fluid", "foray", "elite", "plant", "spawn"]
      let solution = words[Math.floor(Math.random() * words.length)];

      const row = new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
            .setCustomId(`${solution}0`)
            .setLabel('Guess')
            .setStyle(ButtonStyle.Primary),
        );

      let game = new EmbedBuilder()
        .setTitle(`Comfi™ | Wordle`)
        .setDescription(gamedesc.join('\n'))
        .setFooter({ text: `You Have 6 Tries To Guess The Word` })
        .setColor(bot.color)

      await interaction.editReply({ embeds: [game], components: [row] })
      const filter = i => i.customId.slice(0, 5) === solution && i.user.id === interaction.user.id;
      const collector = interaction.channel.createMessageComponentCollector({ time: 120000, filter });

      collector.on('collect', async i => {
        if (i.user.id !== interaction.user.id) return i.reply({ content: 'This is not for you.', ephemeral: true })
        if (i.customId.slice(0, 5) === solution) {
          await i.showModal(modal);
        }
      });

      collector.on('end', async (i, reason) => {
        if (reason === "time") {
          await interaction.editReply({ content: `Times Up! The Correct Word Was **\`${solution}\`**`, components: [] })
        }
      });
    } catch (e) {
      await bot.senderror(interaction, e)
    }
  },
};
