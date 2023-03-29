/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction, ButtonBuilder, ActionRowBuilder, EmbedBuilder, AttachmentBuilder, ApplicationCommandOptionType, ButtonStyle,
} = require('discord.js');
const r = require('link-checker-malicious');
const fetch = require('axios');

module.exports = {
  name: 'screenshot',
  description: 'Take a screenshot of any webpage',
  ownerOnly: false,
  directory: 'utility',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      description: 'Url to take ss',
      name: 'url',
      required: true,
    },
  ],
  userperm: [''],
  botperm: ['UseApplicationCommands'],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    const user = interaction.user.tag;
    const url = interaction.options.getString('url');
    const key = process.env.UltraX;
    try {
      const pattern = new RegExp(
        '^(https?:\\/\\/)?'
        + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'
        + '((\\d{1,3}\\.){3}\\d{1,3}))'
        + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'
        + '(\\?[;&a-z\\d%_.~+=-]*)?'
        + '(\\#[-a-z\\d_]*)?$',
        'i',
      );
      if (!pattern.test(url)) {
        return interaction
          .editReply(`${bot.error} **• Provide a Valid Url**`)
          .catch((e) => { });
      }
      const msg = await bot.successEmbed(bot, interaction, `**Getting screenshot **${bot.emoji('p_loading2')}`);

      setTimeout(async () => {
        await msg.delete().catch(() => null);
      }, bot.ms('29s'));
      interaction.channel.send(bot.tick);
      const nsfw = r.isMalLink(url);

      if (nsfw.toString() === 'true' && nsfw.type === 'nsfw' && !interaction.channel.nsfw) {
        return await bot.errorEmbed(bot, interaction, '**• Nsfw Urls are not allowed in Non-NSFW Channel**').catch((e) => { });
      }

      const res = await fetch(`https://api.ultrax-yt.com/v1/screenshot?url=${url}&key=${key}`).catch(async (e) => await bot.errorEmbed(bot, interaction, 'I can\'t screenshot that url'));

      const buffer = new Buffer.from(res.data.screenshot.split(',')[1], 'base64');

      const image = new AttachmentBuilder(buffer, { name: 'screenshot.png' });

      const emb = new EmbedBuilder()
        .setColor(bot.color)
        .setAuthor({ name: 'Comfi™ Screenshot System', iconURL: bot.user.displayAvatarURL({ dynamic: true }) })
        .setImage('attachment://screenshot.png')
        .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` });

      const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setStyle(ButtonStyle.Link)
          .setURL(`${url}`)
          .setEmoji('883017898984103986')
          .setLabel('Go to Site !!'),
      );

      await interaction.channel.send({
        embeds: [emb],
        files: [image],
        components: [row],
      });
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
