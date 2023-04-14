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
  name: 'welcome',
  description: 'Setup Welcome System',
  ownerOnly: false,
  directory: 'setting',
  options: [
    {
      name: 'toggle',
      description: 'Toggle the system on or off',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'option',
          description: 'Options for welcome toggle',
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
      description: 'Embed Toogle for welcome system',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          type: ApplicationCommandOptionType.String,
          description: 'Options for welcome system embed toggle',
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
      name: 'dm-toggle',
      description: 'Dm Toogle for welcome system',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          type: ApplicationCommandOptionType.String,
          description: 'Options for welcome dm toggle',
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
      name: 'joinrole',
      type: ApplicationCommandOptionType.Subcommand,
      description: 'Add role to user upon joining',
      options: [
        {
          type: ApplicationCommandOptionType.String,
          description: 'Options to enable or disable joinrole',
          name: 'options',
          required: true,
          choices: [
            {
              name: 'add',
              value: 'true',
            },
            {
              name: 'remove',
              value: 'false',
            },
          ],
        },
        {
          name: 'role',
          description: 'Mention the roles to add to user upon joining',
          required: true,
          type: ApplicationCommandOptionType.Role,
        },
      ],
    },
    {
      name: 'channel',
      description: 'Channel for welcome system',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'name',
          type: ApplicationCommandOptionType.Channel,
          description: 'Channel for welcome detector',
          required: true,
          channelTypes: [ChannelType.GuildText],
        },
      ],
    },
    {
      name: 'embed',
      description: 'Setup embed for welcome system',
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
      description: 'Setup content when embedtoggle is off',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'message',
          type: ApplicationCommandOptionType.String,
          description: 'Message for welcome system',
          required: true,
        },
        {
          name: 'image',
          type: ApplicationCommandOptionType.Attachment,
          description: 'Image url for welcome system',
          required: false,
        },
      ],
    },
    {
      name: 'help',
      description: 'Variables for welcome system',
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
        if (guild.welcome.toString() === toggle) {
          return await bot.errorEmbed(bot, interaction, `**Welcome toogle is already setted as ${toggle} !**`);
        }
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            welcome: toggle,
          },
        );
        return await bot.successEmbed(bot, interaction, `**Welcome has setted as ${toggle} !**`);
      }

      if (sub === 'embed-toggle') {
        const toggle = interaction.options.getString('options');
        if (guild.welcome_embedtgl.toString() === toggle) {
          return await bot.errorEmbed(bot, interaction, `**Welcome Embed toggle is already setted as ${toggle} !**`);
        }
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            welcome_embedtgl: toggle,
          },
        );
        return await bot.successEmbed(bot, interaction, `**Welcome Embed toggle has setted as ${toggle} !**`);
      }

      if (sub === 'dm-toggle') {
        const toggle = interaction.options.getString('options');
        if (guild.welcome_dmuser.toString() === toggle) {
          return await bot.errorEmbed(bot, interaction, `**Welcome dm toggle is already setted as ${toggle} !**`);
        }
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            welcome_dmuser: toggle,
          },
        );
        return await bot.successEmbed(bot, interaction, `**Welcome dm toggle has setted as ${toggle} !**`);
      }

      if (sub === 'channel') {
        const channel = interaction.options.getChannel('name');
        if (guild.welcome_channel === channel.id) {
          return await bot.errorEmbed(bot, interaction, `**${
            channel.name
          } already exists as welcome channel !**`);
        }
        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            welcome_channel: channel.id,
          },
        );
        return await bot.successEmbed(bot, interaction, `**Welcome Channel Has Been Set Successfully in \`${
          channel.name
        }\` !**`);
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

     await guilds.findOneAndUpdate(
          {
              guildId: interaction.guild.id,
          
          }, {
              welcome_embed: embed,
          })

   await bot.successEmbed(bot, interaction, `**${name} has been setted as Welcome embed!**`);
          
          
      }

      if (sub === 'joinrole') {
        const toggle = interaction.options.getString('options');
        const role = interaction.options.getRole('role');

        if (toggle === 'true') {
          if (guild.welcome_joinrole.find((r) => r === role.id)) {
            return await bot.errorEmbed(bot, interaction, `**\`${role.name}\` is already available as a join role !**`);
          }
          guild.welcome_joinrole.push(role.id);
          await guild.save();
          return await bot.successEmbed(bot, interaction, `**Successfully Added \`${role.name}\` as a join role !**`);
        } if (toggle === 'false') {
          if (guild.welcome_joinrole.find((r) => r === role.id)) {
            guild.welcome_joinrole.filter((r) => r.id !== role.id);
            await guild.save();
            return await bot.successEmbed(bot, interaction, `**Successfully Removed \`${role.name}\` from JoinRole !**`);
          }
          return await bot.errorEmbed(bot, interaction, `**\`${role.name}\` doesn't exists in join role !**`);
        }
      }

      if (sub === 'content') {
        const msg = interaction.options.getString('message');
        const img = interaction.options.getString('image').url;

        await guilds.findOneAndUpdate(
          { guildId: interaction.guild.id },
          {
            welcome_message: msg,
          },
        );
        return await bot.successEmbed(bot, interaction, `**Welcome Content Has Been Set Successfully as \`${msg}\`!**. Used if embed toggle is off!!`);

        if (img) {
          await guilds.findOneAndUpdate(
            { guildId: interaction.guild.id },
            {
              welcome_image: img,
            },
          );
          return await bot.successEmbed(bot, interaction, `**Welcome Image Has Been Set Successfully in ${img}!**`);
        }
      }

      if (sub === 'help') {
        const embed = new EmbedBuilder()
          .setTitle('Welcome System variables', bot.user.displayAvatarURL())
          .setDescription('Need Help setting Welcome system?')
          .addFields(
            {
              name: 'Commands',
              value: '```toggle - turn on/off the welcome system\nembed-toggle - make the welcome message show in embed or non embed text\ndm-toggle - make the welcome message send in user\'s dm\nchannel - sets the channel for welcome system\nembed - make an embed for welcome system using the embed builder\ncontent - sets the non embed content for welcome system\njoinrole - add roles to user upon ```',
              inline: true,
            },
            {
              name: 'Tags',
              value: '```{{user#mention}} - mentions the user\n{{user#tag}} - the users tag\n{{user#id}} - the users id\n{{server#membercount}} - the servers membercount\n{{server#humancount}} - humans/non-bot members count of the server \n{{server#name}} - the servers name\n{{server#id}} - the servers id\n{{join#position}} \ the users join positionn```',
              inline: true,
            },
          )
          .setColor(bot.color)
          .setFooter({ text: 'Comfi™ Welcome System' });
        await interaction.editReply({ embeds: [embed] });
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
