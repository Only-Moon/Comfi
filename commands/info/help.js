/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { readdirSync } = require('fs');

const prefix = '/';
const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');
const create_mh = require('../../functions/menu_help');

module.exports = {
  name: 'helpp',
  description: 'Show all the Available bot Commands in Menu Form',
  directory: 'info',
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      description: 'particular command',
      name: 'command',
      required: false,
    },
  ],
  userperm: [''],
  botperm: [''],

  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

  run: async (bot, interaction, args) => {
    try {
      const categories = [];
      const cots = [];
      if (!args[0]) {
        // categories to ignore

        const ignored = ['owner', 'context'];

        const emo = {
          anime: '<a:snowman_cs:883017868944502804>',
          economy: '<:currencyy_Blossomii:883032993101406278>',
          // emoji: '<a:apple_cs:883033005172605020>',
          fun: '<a:shootingstaw_cs:883017879065354290>',
          info: '<a:stars_cs:883033007836000308>',
          levels: '<a:bunny_cs:883033003574579260>',
          mod: '<a:pinkheart_cs:883033001599074364>',
          // music: "<a:music_cs:883032989901156422>",
          roles: '<a:cake2_cs:883017860488765460>',
          setup: '<a:starburst_cs:883017855187157003>',
          utility: '<a:ghost_cs:883017884014637066>',
        };

        const ccate = [];
        readdirSync('./commands/').forEach((dir) => {
          if (ignored.includes(dir.toLowerCase())) return;
          const name = `${emo[dir.toLowerCase()]} ${dir.toUpperCase()}`;
          const nome = dir.charAt(0).toUpperCase() + dir.slice(1).toLowerCase();
          let cats = new Object();

          cats = {
            name,
            value: `\`/helpp ${dir.toLowerCase()}\``,
            inline: true,
          };

          categories.push(cats);
          ccate.push(nome);
        });

        const embed = new EmbedBuilder()
          .setTitle('Comfi™ Help')
          .setDescription(
            `My Prefix For __**${
              interaction.guild.name
            }**__ Is  __**${prefix}**__\n\nVisit https://comfibot.tk/commands To Get List Of All My Commands`,
          )
          .addFields(categories)
          .setFooter({
            text: `Requested by ${interaction.member.displayName}`,
            iconURL: interaction.user.avatarURL({
              dynamic: true,
            }),
          })
          .setTimestamp()
          .setThumbnail(
            bot.user.displayAvatarURL({
              dynamic: true,
            }),
          )
          .setColor(bot.color);

        const menus = create_mh(ccate);

        await interaction.editReply({
          embeds: [embed],
          components: menus.smenu,
        });
      } else {
        const catts = [];
        readdirSync('./commands/').forEach((dir) => {
          if (dir.toLowerCase() !== args[0].toLowerCase()) return;
          const commands = readdirSync(`./commands/${dir}/`).filter((file) => file.endsWith('.js'));
          const cmds = commands.map((command) => {
            const file = require(`../../commands/${dir}/${command}`);
            if (!file.name) return 'No command name.';

            const name = file.name.replace('.js', '');

            if (bot.slashCommands.get(name).hidden) return;
            const des = bot.slashCommands.get(name).description;
            const emo = bot.slashCommands.get(name).emoji;
            const emoe = emo ? `${emo} - ` : '';

            const obj = {
              cname: `${emoe}\`${name}\``,
              des,
            };

            return obj;
          });

          let dota = new Object();
          cmds.map((co) => {
            if (co == undefined) return;
            dota = {
              name: `${cmds.length === 0 ? 'In progress.' : co.cname}`,
              value: co.des ? co.des : 'No Description',
              inline: true,
            };

            catts.push(dota);
          });

          cots.push(dir.toLowerCase());
        });

        const command = bot.slashCommands.get(args[0].toLowerCase())
          || bot.slashCommands.find(
            (c) => c.aliases && c.aliases.includes(args[0].toLowerCase()),
          );

        if (cots.includes(args[0].toLowerCase())) {
          const combed = new EmbedBuilder()
            .setTitle(
              `__${args[0].charAt(0).toUpperCase()
              + args[0].slice(1)} Commands!__`,
            )
            .setDescription(
              `Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`,
            )
            .addFields(catts)
            .setFooter({
              text: 'Comfi™ Help',
              iconURL: interaction.user.avatarURL({
                dynamic: true,
              }),
            })
            .setTimestamp()
            .setThumbnail(
              bot.user.displayAvatarURL({
                dynamic: true,
              }),
            )
            .setColor(bot.color);

          return await interaction
            .editReply({
              embeds: [combed],
            })
            .catch(() => null);
        }

        if (!command) {
          return await bot.errorEmbed(bot, interaction, `Invalid command! Use \`${prefix}helpp\` for all of my commands!`);
        }

        let subc = [];
        const rep = bot.emoji('reply');
        const dot = bot.emoji('bunny_cs');

        if (command.options) {
          command.options.forEach((sub) => {
            if (sub.type === ApplicationCommandOptionType.Subcommand) {
              subc.push(`${dot} **${sub.name}** \n${rep}\`${sub.description}\`\n`);
            }
          });
        }

        if (subc.length < 1 || subc === []) {
          subc = '';
        } else if (subc.length > 1) {
          subc = `${subc.toString().replaceAll(',', '')}\n`;
        }

        const embed = new EmbedBuilder()
          .setTitle('Command Details:')
          .addFields(
            {
              name: 'Command:',
              value: command.name ? `\`${command.name}\`` : 'No name for this command.',
              inline: true,
            },
            {
              name: 'Sub Commands:',
              value: subc || 'No Sub Command for this command',
              inline: true,
            },
            {
              name: 'Usage:',
              value: command.usage
                ? `\`${prefix}${command.name} ${command.usage}\``
                : `\`${prefix}${command.name}\``,
              inline: true,
            },
            {
              name: 'Command Description:',
              value: command.description
                ? command.description
                : 'No description for this command.',
              inline: true,
            },
          )

          .setFooter({
            text: 'Comfi™ Help',
            iconURL: interaction.user.avatarURL({
              dynamic: true,
            }),
          })
          .setTimestamp()
          .setThumbnail(
            bot.user.displayAvatarURL({
              dynamic: true,
            }),
          )
          .setColor(bot.color);

        return await interaction
          .editReply({
            embeds: [embed],
          });
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
