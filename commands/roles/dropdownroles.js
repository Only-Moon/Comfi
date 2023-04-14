/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction,
  EmbedBuilder,
  MessageCollector,
  SelectMenuBuilder,
  ActionRowBuilder,
  parseEmoji,
  ApplicationCommandOptionType,
} = require('discord.js');
const guilds = require('../../models/guild');

const stopreasons = {
  FINSHED: '0',
  ERR: '1',
  REQ: '2',
};

module.exports = {
  name: 'dropdownrole',
  description: 'Dropdown Roles Setup',
  ownerOnly: false,
  directory: 'role',
  options: [
    {
      name: 'add',
      description: 'Add / Create a Dropdown Role',
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'list',
      description: 'Shows Server Dropdown  Roles List',
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: 'remove',
      description: 'Remove / delete Dropdown Roles',
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: 'id',
          description: 'Id of the Dropdown role',
          type: ApplicationCommandOptionType.String,
          required: true,
          autocomplete: true,
        },
      ],
    },
  ],
  botperm: ['MANAGE_GUILD'],
  userperm: ['ADMINISTRATOR'],
  /**
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
    const guild = await guilds.findOne({ guildId: interaction.guild.id });

    const [sub] = args;
    try {
      if (sub === 'add') {
        const finalData = {
          interaction: undefined,
          embed_title: undefined,
          embed_color: undefined,
          embed_footer: undefined,
          channel: undefined,
          roles: [],
          messageId: undefined,
        };
        const step1 = new EmbedBuilder()
          .setTitle('Dropdown roles [1]')
          .setDescription(
            'What should the embed title be? Say "skip" to have no title!',
          )
          .setFooter({ text: 'Say "cancel" at any time to stop the process!' })
          .setColor(bot.color);
        const step2 = new EmbedBuilder()
          .setTitle('Dropdown roles [2]')
          .setDescription(
            'What should the embed description be? Say "roles" to make them set as the roles!',
          )
          .setFooter({ text: 'Say "cancel" at any time to stop the process!' })
          .setColor(bot.color);
        const step3 = new EmbedBuilder()
          .setTitle('Dropdown roles [3]')
          .setDescription(
            'What should the embed color be? Say "default" to have the default colour!',
          )
          .setFooter({ text: 'Say "cancel" at any time to stop the process!' })
          .setColor(bot.color);
        const step4 = new EmbedBuilder()
          .setTitle('Dropdown roles [4]')
          .setDescription(
            'What should the embed footer be? Say "skip" to have no footer!',
          )
          .setFooter({ text: 'Say "cancel" at any time to stop the process!' })
          .setColor(bot.color);
        const step5 = new EmbedBuilder()
          .setTitle('Dropdown roles [5]')
          .setDescription(
            'Where should the dropdown message / prompt be sent? (channel id/name/mention) Say "bind" to have it sent in the current channel!',
          )
          .setFooter({ text: 'Say "cancel" at any time to stop the process!' })
          .setColor(bot.color);
        const step6 = new EmbedBuilder()
          .setTitle('Dropdown roles [6]')
          .setDescription(
            'Please list your emojis and roles!  (E.G **<emoji>** **<role id/mention/name>** ) Say **done** once finshed!',
          )
          .setFooter({ text: 'Say "cancel" at any time to stop the process!' })
          .setColor(bot.color);

        let counter = 0;
        await interaction.deleteReply();
        const steps = [step1, step2, step3, step4, step5, step6];
        const hoisterMessage = await interaction.channel.send({
          embeds: [steps[counter]],
        });
        const collector = new MessageCollector(interaction.channel);
        collector.on('collect', async (msg) => {
          if (msg.author.id !== interaction.user.id) return;
          if (msg.content.toLowerCase() === 'cancel') {
            hoisterMessage.delete().catch(() => { });
            msg.delete().catch(() => { });
            return await bot.errorEmbed(bot, interaction, 'Process has been stopped!');
            collector.stop(stopreasons.REQ);
            return;
          }
          switch (counter) {
            case 0:
              if (msg.content.toLowerCase() === 'skip') {
                finalData.embed_title = 'skipped';
              } else {
                finalData.embed_title = msg.content
                  .split('')
                  .slice(0, 50)
                  .join('');
              }
              counter++;
              hoisterMessage.edit({ embeds: [steps[counter]] });
              msg.delete().catch(() => { });
              break;
            case 1:
              if (msg.content.toLowerCase() === 'roles') {
                finalData.message = 'roles';
              } else {
                finalData.message = msg.content
                  .split('')
                  .slice(0, 1024)
                  .join('');
              }
              counter++;
              hoisterMessage.edit({ embeds: [steps[counter]] });
              msg.delete().catch(() => { });
              break;
            case 2:
              if (msg.content.toLowerCase() === 'default') {
                finalData.embed_color = bot.color;
              } else if (testHex(msg.content)) {
                finalData.embed_color = msg.content;
              } else {
                return await bot.errorEmbed(bot, interaction, 'Please supply a valid hex code (E.G #FFFFFF or FFFFFF)');
                collector.stop(stopreasons.ERR);
                hoisterMessage.delete().catch(() => { });
              }
              counter++;
              hoisterMessage.edit({ embeds: [steps[counter]] });
              msg.delete().catch(() => { });
              break;
            case 3:
              if (msg.content.toLowerCase() === 'skip') {
                finalData.embed_footer = 'skipped';
              } else {
                finalData.embed_footer = msg.content
                  .split('')
                  .slice(0, 50)
                  .join('');
              }
              counter++;
              hoisterMessage.edit({ embeds: [steps[counter]] });
              msg.delete().catch(() => { });
              break;
            case 4:
              let channel;
              if (msg.content.toLowerCase() === 'bind') {
                channel = interaction.channel;
              } else {
                channel = msg.mentions.channels.first()
                || interaction.guild.channels.cache.find(
                  (c) => c.id === msg.content
                    || c.name.toLowerCase() === msg.content.toLowerCase(),
                );
              }
              if (!channel) {
                return await bot.errorEmbed(bot, interaction, 'Please supply a valid channel or use "bind" to bind it to the current channel!');
                collector.stop(stopreasons.ERR);
                hoisterMessage.delete().catch(() => { });
              }
              finalData.channel = channel?.id;
              counter++;
              hoisterMessage.edit({ embeds: [steps[counter]] });
              msg.delete().catch(() => { });
              break;
            case 5:
              if (msg.content.toLowerCase() === 'done') {
                if (finalData.roles.length <= 0) {
                  return await bot.errorEmbed(bot, interaction, 'Please supply some dropdown roles!');
                  collector.stop(stopreasons.ERR);
                  hoisterMessage.delete().catch(() => { });
                  return;
                }
                hoisterMessage.delete().catch(() => { });
                msg.delete().catch(() => { });
                collector.stop(stopreasons.FINSHED);
                return;
              }
              const [emoji, ...roles] = msg.content.split(/ +/);

              const parsedEmoji = parseEmoji(emoji);
              if (!parsedEmoji.id) {
                return await bot.errorEmbed(bot, interaction, 'Please supply a valid emoji!');
                hoisterMessage.delete().catch(() => { });
                collector.stop(stopreasons.ERR);
              }
              const serverrole = msg.mentions.roles.first()
              || interaction.guild.roles.cache.find(
                (r) => r.id === roles.join(' ')
                  || r.name.toLowerCase() === roles.join(' ').toLowerCase(),
              );
              if (!serverrole) {
                return await bot.errorEmbed(bot, interaction, 'Please supply a valid role!')
                  .catch(() => null);
                hoisterMessage.delete().catch(() => { });
                collector.stop(stopreasons.ERR);
              }
              const ex = parsedEmoji.animated
                ? `<a:${parsedEmoji.name}:${parsedEmoji.id}:>`
                : `<:${parsedEmoji.name}:${parsedEmoji.id}:>`;
              finalData.roles.push({
                emoji: `${ex}`,
                role: `${serverrole.id}`,
                viewEmoji: `${parsedEmoji.id}`,
              });

              break;
          }
        });

        collector.on('end', async (collected, reason) => {
          if (reason === stopreasons.REQ || reason === stopreasons.ERR) {
            return;
          }
          if (reason === stopreasons.FINSHED) {
            const roles = [];
            const dropdownMenuItems = [];
            dropdownMenuItems.push({
              emoji: '<a:p_loading2:883233237760086037>',
              label: 'Click Me First To Get Roles',
              value: 'place_holder',
            });
            finalData.roles.forEach((r) => {
              const serverRoles = interaction.guild.roles.cache.find(
                (x) => x.id === r.role,
              );
              const serverEmoji = interaction.guild.emojis.cache.find(
                (e) => e.id === r.viewEmoji,
              );
              roles.push(` > ${serverEmoji} **•** <@&${r.role}>`);
              dropdownMenuItems.push({
                emoji: `${r.emoji}`,
                label: `${serverRoles.name}`,
                value: `${serverRoles?.id}`,
                description: `Click this to get the ${serverRoles.name} role!`,
              });
            });
            const row = new ActionRowBuilder().addComponents([
              new SelectMenuBuilder()
                .setPlaceholder('Choose your roles...')
                .setCustomId('dropdown_roles')
                .addOptions(dropdownMenuItems),
            ]);
            const finalEmbed = new EmbedBuilder().setColor(finalData.embed_color);
            if (finalData.embed_title !== 'skipped') {
              finalEmbed.setTitle(finalData.embed_title);
            }
            if (finalData.embed_footer !== 'skipped') {
              finalEmbed.setFooter(finalData.embed_footer);
            }
            if (finalData.message === 'roles') {
              finalEmbed.setDescription(roles.join('\n'));
            } else {
              finalEmbed.setDescription(finalData.message);
            }

            const channel = interaction.guild.channels.cache.find(
              (c) => c.id === finalData.channel,
            );
            const finalMessage = await channel
              .send({ embeds: [finalEmbed], components: [row] });

            const msgId = getId();
            await guilds.findOneAndUpdate(
              { guildId: interaction.guild.id },
              {
                $push: {
                  dropdownRoles:
                  {
                    msgId: finalMessage.id,
                    chanId: channel.id,
                    roles: finalData.roles,
                    id: `${msgId}`,
                  },
                },
              },
            );
            const embed = new EmbedBuilder()
              .setColor(bot.color)
              .setDescription(
                ` > ${bot.tick} • **Created Dropdown roles!**\n\n > ${
                  bot.tick
                } • Id: \`${msgId}\`\n > ${
                  bot.tick
                } • [\`Jump\`](https://discordapp.com/channels/${
                  interaction.guild.id
                }/${channel.id}/${finalMessage.id})`,
              );

            interaction.channel.send({ embeds: [embed] });
          }
        });
      }

      if (sub === 'list') {
        if (guild.dropdownRoles.length <= 0) {
          return await bot.errorEmbed(bot, interaction, 'This server has no dropdown roles setup!');
        }
        const arr = [];
        let pos = 0;
        guild.dropdownRoles.forEach((dd) => {
          arr.push(
            ` > **#${pos++})** \`${
              dd.id
            }\` • [\`Jump\`](https://discordapp.com/channels/${
              interaction.guild.id
            }/${dd.chanId}/${dd.msgId})  `,
          );
        });
        const embed = new EmbedBuilder()
          .setDescription(arr.join('\n'))
          .setColor(bot.color);

        return interaction.editReply({ embeds: [embed] });
      }

      if (sub === 'remove') {
        const id = interaction.options.getString('id');

        if (guild.dropdownRoles.length <= 0) {
          return await bot.errorEmbed(bot, interaction, 'This server has no dropdown roles setup!');
        }
        if (!id.length) {
          return await bot.errorEmbed(bot, interaction, 'Please supply a valid dropdown role\'s ID!')
            .catch(() => null);
        }
        let value;
        let dropdown;
        let dd_values;
        guild.dropdownRoles.forEach((dd) => {
          if (dd.id === id) {
            value = true;
            dropdown = guild.dropdownRoles.indexOf(dd);
            dd_values = dd.msgId;
          }
        });

        if (!value) {
          return await bot.errorEmbed(bot, interaction, 'Please supply a valid dropdown role\'s ID!')
            .catch(() => null);
        }
        const channel = interaction.guild.channels.cache.find(
          (c) => c.id === dd_values.chanId,
        );
        if (channel) {
          const msg = await channel.messages.fetch(dd_values);
          if (msg) {
            msg.delete().catch(() => { });
            return;
          }
          return;
        }
        guild.dropdownRoles.splice(dropdown, 1);
        guild.save();

        const embed = new EmbedBuilder()
          .setDescription(
            ` > ${
              bot.tick
            } • Removed dropdown (If the message isn't deleted, then delete it manually) \`${id}\``,
          )
          .setColor(bot.color);

        return interaction.editReply({ embeds: [embed] });
      }
    } catch {
      await bot.senderror(interaction, e);
    }
  },
};

function testHex(str) {
  const regexp = /#[0-9a-f]{6}|#[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{3}/gi;
  if (regexp.test(str)) {
    if (str.split('').length > 6) {
      return false;
    }
    return true;
  }
  return false;
}

function getId() {
  const chars = '123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm<>{}][)(*&^$_-+=';
  let str = '';
  for (let i = 0; i < 15; i++) {
    str += chars[Math.floor(Math.random() * chars.length)];
  }
  return str;
}
