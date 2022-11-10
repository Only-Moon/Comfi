/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ApplicationCommandOptionType,
  parseEmoji,
} = require('discord.js');
const simplydjs = require('simply-djs');

module.exports = {
  name: 'emoji',
  description: 'Enlarge an emote or find emote from Comfi\'s emote list',
  ownerOnly: false,
  directory: 'info',
  options: [
    {
      name: 'enlarge',
      description: 'enlarge one or more than one emotes',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          type: ApplicationCommandOptionType.String,
          description: 'Emojis to Enlarge',
          name: 'name',
          required: true,
        },
      ],
    },
    {
      name: 'find',
      description: "find an emote from Comfi's emote list",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'emote',
          description: 'enter a name to search emote or `all` to get list of all emotes',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: 'guild',
          description: 'search emote from a particular server using name or id',
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    },
  ],
  userperm: [''],
  botperm: ['SEND_MESSAGES'],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    const [sub] = args;

    try {
      if (sub === 'enlarge') {
        const emojis = args.join(' ').match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/gi);

        if (!emojis) {
          return await bot.errorEmbed(bot, interaction, '**Enter A Valid Emoji in** `:emoji:` **form not** `<:emojiname:emojiid>`', 'https://i.imgur.com/rxfYEkA.png');
        }

        if (emojis.length === 1) {
          const emote = interaction.options.getString('name');

          const emo = parseEmoji(emote);

          if (!emo.name || !emo.id) {
            return await bot.errorEmbed(bot, interaction, '**Enter A Valid Emoji in** `:emoji:` **form not** `<:emojiname:emojiid>`', 'https://i.imgur.com/rxfYEkA.png');
          }

          const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
            emo.animated ? 'gif' : 'png'
          }`;

          const img = `https://cdn.discordapp.com/emojis/${emo.id}.${
            emo.animated ? 'gif' : 'png'
          }`;

          const embed = new EmbedBuilder()
            .setColor(bot.color)
            .setAuthor({
              name: 'Comfi™ Enlarged Emoji',
              iconURL: interaction.user.avatarURL({ dynamic: true }),
            })
            .setImage(`${img}`)
            .setDescription(`${emo.name} ${emo.id}`);

          const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setCustomId('backEmoji')
              .setEmoji('884420649580363796')
              .setDisabled(true),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Link)
              .setURL(`${res}`)
              .setLabel('Download!'),
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setCustomId('forwardEmoji')
              .setEmoji('884420650549272586')
              .setDisabled(true),
          );

          await interaction
            .followUp({
              embeds: [embed],
              components: [row],
            }).catch(() => null);
        } else if (emojis.length > 1) {
          const emote = interaction.options.getString('name');

          const pages = [];

          emojis.forEach(async (emoji) => {
            const emo = parseEmoji(emoji);

            if (!emo.name || !emo.id) {
              return await bot.errorEmbed(bot, interaction, '**Enter A Valid Emoji in** `:emoji:` **form not** `<:emojiname:emojiid>`', 'https://i.imgur.com/rxfYEkA.png');
            }

            const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
              emo.animated ? 'gif' : 'png'
            }`;

            const embed = new EmbedBuilder()
              .setColor(bot.color)
              .setAuthor({
                name: 'Enlarged Emoji',
                iconURL: interaction.user.avatarURL({ dynamic: true }),
              })
              .setImage(`${res}`)
              .setDescription(`${emo.name} ${emo.id}`);

            pages.push(embed);
          });

          await bot.btnPage(interaction, pages);
        } else return await bot.errorEmbed(bot, interaction, ' **Can\'t find an Emote to Enlarge**');
      }

      if (sub === 'find') {
        const name = interaction.options.getString('emote');
        const guildd = interaction.options.getString('guild');
        const guild = bot.guilds.cache.find((g) => g.id === guildd) || bot.guilds.cache.find((g) => g.name === guildd);
        let emoss;

        if (name.toLowerCase() === 'all') {
          const emojis = [];
          const pages = [];

          if (guild) {
            emoss = guild;
          } else {
            emoss = bot;
          }

          const emos = emoss.emojis.cache
            .filter((e) => e.name != 'steal')
            .forEach(async (emo) => {
              if (!emo.name || !emo.id) {
                return await bot.errorEmbed(bot, interaction, '**Enter A Valid Emoji Name', 'https://i.imgur.com/vQSaRJp.png');
              } const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
                emo.animated ? 'gif' : 'png'
              }`;

              const embed = new EmbedBuilder()
                .setColor(bot.color)
                .setAuthor({
                  name: 'Comfi™ Emojis',
                  iconURL: bot.user.avatarURL({ dynamic: true }),
                })
                .setImage(`${res}`)
                .setFooter({ text: `This emoji is from ${emo.guild.name}`, iconURL: emo.guild.iconURL({ dynamic: true }) })
                .setDescription(`${emo.name} ${emo.id}`);

              pages.push(embed);
            });

          bot.btnPage(interaction, pages);
        } else {
          const emojis = [];
          if (guild) {
            emoss = guild;
          } else {
            emoss = bot;
          }

          const emos = emoss.emojis.cache
            .filter((emoji) => emoji.name.includes(name) && !emoji.name.includes('steal'))
            .forEach((emoji) => emojis.push(emoji));
          if (emojis.length > 1) {
            const pages = [];

            emojis.forEach(async (emo) => {
              if (!emo.name || !emo.id) {
                return await bot.errorEmbed(bot, interaction, '**Enter A Valid Emoji Name', 'https://i.imgur.com/vQSaRJp.png');
              }

              const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
                emo.animated ? 'gif' : 'png'
              }`;

              const embed = new EmbedBuilder()
                .setColor(bot.color)
                .setAuthor({
                  name: 'Comfi™ Emojis',
                  iconURL: bot.user.avatarURL({ dynamic: true }),
                })
                .setImage(`${res}`)
                .setDescription(`${emo.name} ${emo.id}`)
                .setFooter({ text: `This emoji is from ${emo.guild.name}`, iconURL: emo.guild.iconURL({ dynamic: true }) });

              pages.push(embed);
            });

            await bot.btnPage(interaction, pages);
          } else if (emojis.length === 1) {
            const emo = emojis[0];
            if (!emo.name || !emo.id) {
              return await bot.errorEmbed(bot, interaction, 'Provide a Valid Emoji Name', 'https://i.imgur.com/vQSaRJp.png');
            }
            const res = `https://cdn.discordapp.com/emojis/${emo.id}.${
              emo.animated ? 'gif' : 'png'
            }`;

            const img = `https://cdn.discordapp.com/emojis/${emo.id}.${
              emo.animated ? 'gif' : 'png'
            }`;

            const embed = new EmbedBuilder()
              .setColor(bot.color)
              .setAuthor({
                name: 'Comfi™ Emojis',
                iconURL: bot.user.avatarURL({ dynamic: true }),
              })
              .setImage(`${img}`)
              .setDescription(`${emo.name} ${emo.id}`)
              .setFooter({ text: `This emoji is from ${emo.guild.name}`, iconURL: emo.guild.iconURL({ dynamic: true }) });
            const row = new ActionRowBuilder().addComponents(
              new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId('backEmoji')
                .setEmoji('884420649580363796')
                .setDisabled(true),
              new ButtonBuilder()
                .setStyle(ButtonStyle.Link)
                .setURL(`${res}`)
                .setLabel('Download!'),
              new ButtonBuilder()
                .setStyle(ButtonStyle.Secondary)
                .setCustomId('forwardEmoji')
                .setEmoji('884420650549272586')
                .setDisabled(true),
            );

            await interaction
              .followUp({
                embeds: [embed],
                components: [row],
              }).catch(() => null);
          } else {
            return await bot.errorEmbed(bot, interaction, ' **• Emoji not found !!**').then((msg) => {
              setTimeout(() => { msg.delete(); }, bot.ms('30s'));
            });
          }
        }
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
