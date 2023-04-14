/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction, EmbedBuilder, AttachmentBuilder, ApplicationCommandOptionType,
} = require('discord.js');
const Meme = require('memer-api');

const memer = new Meme(process.env.MEMER);

module.exports = {
  name: 'image',
  description: 'Image manipulation commands',
  directory: 'fun',
  userperm: [''],
  botperm: [''],
  cooldown: 15,
  options: [
    {
      name: 'abandon',
      description: 'Abandon image',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'text',
          description: 'Text You want to add in the image',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: 'byemom',
      description: 'byemom image',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user1',
          description: 'The user profile you want to use',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: 'text',
          description: 'The Text you want to add in the image',
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: 'cancer',
      description: 'cancer image',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user1',
          description: 'The user profile you want to use',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
    {
      name: 'dab',
      description: 'dab image',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user1',
          description: 'The user profile you want to use',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
    {
      name: 'drake',
      description: 'the drake meme',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'line_1',
          type: ApplicationCommandOptionType.String,
          description: 'WHAT am i putting in fist line',
          required: true,
        },
        {
          name: 'line_2',
          type: ApplicationCommandOptionType.String,
          description: 'WHAT am i putting in the second line',
          required: true,
        },
      ],
    },
    {
      name: 'delete',
      description: 'delete image',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user1',
          description: 'The user profile you want to use',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
    {
      name: 'disability',
      description: 'disability image',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user1',
          description: 'The user profile you want to use',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
    {
      name: 'door',
      description: 'door image',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user1',
          description: 'The user profile you want to use',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
    {
      name: 'egg',
      description: 'egg image',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'user1',
          description: 'The user profile you want to use',
          type: ApplicationCommandOptionType.User,
          required: true,
        },
      ],
    },
    {
      name: 'emergencymeeting',
      description: 'emergencymeeting image',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'text',
          description: 'The Text you want to add in the image',
          type: ApplicationCommandOptionType.String,
          required: true,

        },
      ],
    },

  ],

  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    try {
      const [subcommand] = args;

      // Abandon image-----------------------------------------------------------------------------------------------
      if (subcommand === 'abandon') {
        const text = interaction.options.getString('text');
        const temp = new EmbedBuilder()
          .setColor(bot.color)
          .setAuthor({ name: 'Getting Image Data..', iconURL: 'https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif' });

        await interaction.followUp({ embeds: [temp] });
        memer.abandon(text).then((image) => {
          // make an attachment
          const attachment = new AttachmentBuilder(image, 'abandon.png');
          // delete old message

          // send new Message
          const genMeme = new EmbedBuilder()
            .setColor(bot.color)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setImage('attachment://abandon.png')
            .setFooter({ text: 'Generated with memer API' });
          interaction.editReply({ embeds: [genMeme], files: [attachment] })
            .catch((e) => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        });
      }
      // BYE MOM----------------------------------------------------------------------------------------------------------
      if (subcommand === 'byemom') {
        const user1 = interaction.options.getUser('user1');
        const text = interaction.options.getString('text');
        const temp = new EmbedBuilder()
          .setColor(bot.color)
          .setAuthor({ name: 'Getting Image Data..', iconURL: 'https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif' });

        await interaction.followUp({ embeds: [temp] });

        const avatar = user1.displayAvatarURL({ format: 'png' });
        memer.byemom(avatar, user1.username, text).then((image) => {
          // make an attachment
          const attachment = new AttachmentBuilder(image, 'byemom.png');
          // delete old message
          const genMeme = new EmbedBuilder()
            .setColor(bot.color)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setImage('attachment://byemom.png')
            .setFooter({ text: 'Generated with memer API' });
          interaction.editReply({ embeds: [genMeme], files: [attachment] })
            .catch((e) => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        });
      }

      // cancer image-----------------------------------------------------------------------------------------------------------------
      if (subcommand === 'cancer') {
        const user1 = interaction.options.getUser('user1');
        const temp = new EmbedBuilder()
          .setColor(bot.color)
          .setAuthor({ name: 'Getting Image Data..', iconURL: 'https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif' });

        await interaction.followUp({ embeds: [temp] });
        const avatar = user1.displayAvatarURL({ format: 'png' });
        memer.cancer(avatar).then((image) => {
          // make an attachment
          const attachment = new AttachmentBuilder(image, 'cancer.png');
          const genMeme = new EmbedBuilder()
            .setColor(bot.color)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setImage('attachment://cancer.png')
            .setFooter({ text: 'Generated with memer API' });
          interaction.editReply({ embeds: [genMeme], files: [attachment] })
            .catch((e) => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        });
      }
      // Dab Image-----------------------------------------------------------------------------------------------------------------
      if (subcommand === 'dab') {
        const user1 = interaction.options.getUser('user1');
        const temp = new EmbedBuilder()
          .setColor(bot.color)
          .setAuthor({ name: 'Getting Image Data..', iconURL: 'https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif' });

        await interaction.followUp({ embeds: [temp] });
        const avatar = user1.displayAvatarURL({ format: 'png' });
        memer.dab(avatar).then((image) => {
          // make an attachment
          const attachment = new AttachmentBuilder(image, 'dab.png');
          const genMeme = new EmbedBuilder()
            .setColor(bot.color)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setImage('attachment://dab.png')
            .setFooter({ text: 'Generated with memer API' });
          interaction.editReply({ embeds: [genMeme], files: [attachment] })
            .catch((e) => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        });
      }

      // Delete Image---------------------------------------------------------------------------------------------------------------
      if (subcommand === 'delete') {
        const user1 = interaction.options.getUser('user1');
        const temp = new EmbedBuilder()
          .setColor(bot.color)
          .setAuthor({ name: 'Getting Image Data..', iconURL: 'https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif' });

        await interaction.followUp({ embeds: [temp] });
        const avatar = user1.displayAvatarURL({ format: 'png' });
        memer.delete(avatar).then((image) => {
          // make an attachment
          const attachment = new AttachmentBuilder(image, 'delete.png');
          const genMeme = new EmbedBuilder()
            .setColor(bot.color)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setImage('attachment://delete.png')
            .setFooter({ text: 'Generated with memer API' });
          interaction.editReply({ embeds: [genMeme], files: [attachment] })
            .catch((e) => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        });
      }

      // Disability Image------------------------------------------------------------------------------------------------------------
      if (subcommand === 'disability') {
        const user1 = interaction.options.getUser('user1');
        const temp = new EmbedBuilder()
          .setColor(bot.color)
          .setAuthor({ name: 'Getting Image Data..', iconURL: 'https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif' });

        await interaction.followUp({ embeds: [temp] });
        const avatar = user1.displayAvatarURL({ format: 'png' });
        memer.disability(avatar).then((image) => {
          // make an attachment
          const attachment = new AttachmentBuilder(image, 'disability.png');
          const genMeme = new EmbedBuilder()
            .setColor(bot.color)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setImage('attachment://disability.png')
            .setFooter({ text: 'Generated with memer API' });
          interaction.editReply({ embeds: [genMeme], files: [attachment] })
            .catch((e) => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        });
      }
      // Door Image------------------------------------------------------------------------------------------------------------
      if (subcommand === 'door') {
        const user1 = interaction.options.getUser('user1');
        const temp = new EmbedBuilder()
          .setColor(bot.color)
          .setAuthor({ name: 'Getting Image Data..', iconURL: 'https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif' });

        await interaction.followUp({ embeds: [temp] });
        const avatar = user1.displayAvatarURL({ format: 'png' });
        memer.door(avatar).then((image) => {
          // make an attachment
          const attachment = new AttachmentBuilder(image, 'door.png');
          const genMeme = new EmbedBuilder()
            .setColor(bot.color)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setImage('attachment://door.png')
            .setFooter({ text: 'Generated with memer API' });
          interaction.editReply({ embeds: [genMeme], files: [attachment] })
            .catch((e) => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        });
      }

      // Disability Image------------------------------------------------------------------------------------------------------------
      if (subcommand === 'drake') {
        const text1 = interaction.options.getString('line_1');
        const text2 = interaction.options.getString('line_2');

        const finalLink = `https://luminabot.xyz/api/image/drake?yes=${encodeURIComponent(text2)}&no=${encodeURIComponent(text1)}`;

        const attach = new AttachmentBuilder(finalLink, 'drake.png');

        interaction.followUp({ files: [attach] });
      }

      // egg Image------------------------------------------------------------------------------------------------------------
      if (subcommand === 'egg') {
        const user1 = interaction.options.getUser('user1');
        const temp = new EmbedBuilder()
          .setColor(bot.color)
          .setAuthor({ name: 'Getting Image Data..', iconURL: 'https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif' });

        await interaction.followUp({ embeds: [temp] });
        const avatar = user1.displayAvatarURL({ format: 'png' });
        memer.egg(avatar).then((image) => {
          // make an attachment
          const attachment = new AttachmentBuilder(image, 'egg.png');
          const genMeme = new EmbedBuilder()
            .setColor(bot.color)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setImage('attachment://egg.png')
            .setFooter({ text: 'Generated with memer API' });
          interaction.editReply({ embeds: [genMeme], files: [attachment] })
            .catch((e) => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        });
      }

      // emergency meeting image-----------------------------------------------------------------------------------------
      if (subcommand === 'emergencymeeting') {
        const text = interaction.options.getString('text');
        const temp = new EmbedBuilder()
          .setColor(bot.color)
          .setAuthor({ name: 'Getting Image Data..', iconURL: 'https://images-ext-1.discordapp.net/external/ANU162U1fDdmQhim_BcbQ3lf4dLaIQl7p0HcqzD5wJA/https/cdn.discordapp.com/emojis/756773010123522058.gif' });

        await interaction.followUp({ embeds: [temp] });

        memer.emergencymeeting(text).then((image) => {
          // make an attachment
          const attachment = new AttachmentBuilder(image, 'emergencymeeting.png');
          // delete old message
          const genMeme = new EmbedBuilder()
            .setColor(bot.color)
            .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
            .setImage('attachment://emergencymeeting.png')
            .setFooter({ text: 'Generated with memer API' });
          interaction.editReply({ embeds: [genMeme], files: [attachment] })
            .catch((e) => console.log("Couldn't delete msg, this is for preventing a bug".gray));
        });
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
