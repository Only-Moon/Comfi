/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { EmbedBuilder, CommandInteraction } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
  name: 'meme',
  description: 'Get a random meme from reddit',
  directory: 'fun',
  ownerOnly: false,
  userperm: [''],
  botperm: [''],
  /**
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  run: async (bot, interaction, args) => {
    try {
      await fetch('http://meme-api.herokuapp.com/gimme/memes')
        .then((response) => response.json())
        .then(async (r) => {
          const embed = new EmbedBuilder()
            .setImage(`${r.url}`)
            .setTitle(`${r.title}`)
            .setURL(`${r.postLink}`)
            .setColor(bot.color)
            .setFooter({ text: `🔼 ${r.ups} | Author: ${r.author}` });

          await interaction.editReply({ embeds: [embed] });
        });
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
