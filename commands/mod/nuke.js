/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, EmbedBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
  name: 'nuke',
  directory: 'mod',
  description: 'A simple nuke command.',
  ownerOnly: false,
  userperm: ['ManageGuild'],
  botperm: ['ManageGuild'],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {*} args
	 */
  run: async (bot, interaction, args) => {
    try {
      interaction.channel
        .clone()
        .then(async (ch) => {
          await ch.setParent(interaction.channel.parent.id);
          await ch.setPosition(interaction.channel.position);
          await interaction.channel.delete();

          const NukeEmbed = new EmbedBuilder()
            .setColor(bot.color)
            .setDescription(
              `${bot.tick}• **${
                interaction.user.tag
              }** Successfully Nuked this channel.`,
            )
            .setImage('https://tenor.com/view/nuke-gif-8044239');

          ch.send({
            embeds: [NukeEmbed],
          }).then((msg) => {
            setTimeout(() => {
              msg.delete();
            }, bot.ms('60s'));
          });
        })
        .catch(() => null);
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
