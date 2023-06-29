/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction, EmbedBuilder, ApplicationCommandOptionType, ChannelType,
} = require('discord.js');
const guilds = require('../../models/guild');
const embedCreate = require('../../functions/embed');

module.exports = {
  name: 'boost',
  description: 'Setup Boost Detector System',
  directory: 'setting',
  ownerOnly: false,
  options: [
    {
      name: 'toggle',
      description: 'Toggle the system on or off',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'option',
          description: 'Options for boost Detector toggle',
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: 'true/on',
              value: 'true',
            },
            {
              name: 'false/off',
              value: 'false',
            },
          ],
        },
      ],
    },
    {
      name: 'embed-toggle',
      description: 'Embed Toogle for boosy detector system',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          type: ApplicationCommandOptionType.String,
          description: 'Options for boost detector embed toggle',
          name: 'options',
          required: true,
          choices: [
            {
              name: 'true/on',
              value: 'true',
            },
            {
              name: 'false/off',
              value: 'false',
            },
          ],
        },
      ],
    },
    {
      name: 'channel',
      description: 'Channel for boost detector',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'name',
          type: ApplicationCommandOptionType.Channel,
          description: 'Channel for boost detector',
          required: true,
          channelTypes: [ChannelType.GuildText],
        },
      ],
    },
    {
      name: 'embed',
      description: 'Setup embed for boost detector',
      type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "name",
                    type: ApplicationCommandOptionType.String,
                    description: "Give me an embed name to set",
                    required: true,
                    autocomplete: true
                },
                ],
    },
    {
      name: 'content',
      description: 'Setup content for boost detector when embed toggle is off',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'message',
          type: ApplicationCommandOptionType.String,
          description: 'Message for boost detector',
          required: true,
        },
        {
          name: 'image',
          type: ApplicationCommandOptionType.Attachment,
          description: 'Image url for boost detector',
          required: false,
        },
      ],
    },
    {
      name: 'help',
      description: 'Help for leave Boost Detector',
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  userperm: ['ManageGuild'],
  botperm: ['ManageGuild'],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    const [sub] = args;
    try {
      const guild = await guilds.findOne({ guildId: interaction.guild.id });

      if (sub === 'toggle') {
        const toggle = interaction.options.getString('option');
        if (guild?.boost.toString() === toggle) {
          return await bot.errorEmbed(bot, interaction, `**Boost toogle is already setted as ${toggle} !**`);
        }
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            boost: toggle,
          },
        );
        return await bot.successEmbed(bot, interaction, `**Boost Detector has setted as ${toggle} !**`);
      }

      if (sub === 'embed-toggle') {
        const toggle = interaction.options.getString('option');
        if (guild.boost_embedtgl.toString() === toggle) {
          return await bot.errorEmbed(bot, interaction, `**Boost Detector embed toggle is already setted as ${toggle}!**`);
        }
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            boost_embedtgl: toggle,
          },
        );
        return await bot.successEmbed(bot, interaction, `**Boost Detector  embed toggle has setted as ${toggle} !**`);
      }

      if (sub === 'channel') {
        const channel = interaction.options.getChannel('name');
        if (guild.boost_channel === channel.id) {
          return await bot.errorEmbed(bot, interaction, `**${channel.name} already exists as boost channel !**`);
        }
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            boost_channel: channel.id,
          },
        );
        return await bot.successEmbed(bot, interaction, `**Boost Channel Has Been Set Successfully in \`${
          channel.name
        }\`!**`);
      }

      if (sub === 'embed') {

          const name = interaction.options.getString('name');
 
                 const embed = guild.embeds.find((embed) => embed.name === name);

            if (!embed)
                return await bot.errorEmbed(
                    bot,
                    interaction,
                    `No embed found with name: ${name}`
                );

            const embed_new = EmbedBuilder.from(embed);

     await guilds.findOneAndUpdate(
          {
              guildId: interaction.guild.id,
          
          }, {
              boost_embed: embed_new,
          })

   await bot.successEmbed(bot, interaction, `**${name} has been setted as Boost embed!**`);
          
 
      }

      if (sub === 'content') {
        const msg = interaction.options.getString('message');
        const img = interaction.options.getString('image');

        if (msg) {
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            boost_message: msg,
          },
        );
        return await bot.successEmbed(bot, interaction, `**Boost Content Has Been Set Successfully as \`${msg}\`!**. Used if embed toggle is off!`);
        }
        
        if (img) {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              boost_image: img.url,
            },
          );
          return await bot.successEmbed(bot, interaction, `**Boost Channel Has Been Set Successfully in ${img}!**. Used only when embed toggle is off`);
        }
      }

      if (sub === 'help') {
        const embed = new EmbedBuilder()
          .setTitle('Boost System variables', bot.user.displayAvatarURL())
          .setDescription('Need Help setting Boost system?')
          .addFields(
            {
              name: 'Commands',
              value: '```toggle - turn on/off the boost detector\nembed-toggle - make the boost message show in embed or non embed text\nembed - make an embed for boost detector using the embed builder\ncontent - sets the non embed content for boost detector\n```',
              inline: true,
            },
            {
              name: 'Tags',
              value: '```{{user#mention}} - mentions the user\n{{user#tag}} - the user of the person who \n{{server#name}} - the servers name\n{{boost#count}} - boost count of the server\n```',
              inline: true,
            },
          )
          .setColor(bot.color)
          .setFooter({ text: 'Comfi™ Boost Detector' });
        await interaction.editReply({ embeds: [embed] });
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
