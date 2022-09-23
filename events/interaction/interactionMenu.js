const bot = require('../../index');
const { readdirSync } = require('fs');

const prefix = '/';
const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  SelectMenuBuilder,
  ComponentType,
} = require('discord.js');
const datas = require('../../models/Client');

/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

bot.on('interactionCreate', async (interaction) => {
  if (interaction.isSelectMenu()) {
    try {
      if (interaction.customId === 'help-menus') {
        const { values } = interaction;
        const value = values[0];
        const catts = [];
        const cots = [];
        readdirSync('./commands/').forEach((dir) => {
          if (dir.toLowerCase() !== value.toLowerCase()) return;
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
          const rep = bot.emoji('reply');
          const dot = bot.emoji('bunny_cs');
          cmds.map((co) => {
            if (co == undefined) return;
            dota = {
              name: cmds.length === 0 ? 'In progress.' : `${dot} ${co.cname}`,
              value: co.des ? `${rep} ${co.des}` : 'No Description',
              inline: true,
            };

            catts.push(dota);
          });

          cots.push(dir.toLowerCase());
        });

        if (cots.includes(value.toLowerCase())) {
          const combed = new EmbedBuilder()
            .setTitle(
              `__${value.charAt(0).toUpperCase() + value.slice(1)} Commands!__`,
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

          await interaction.deferUpdate();

          return interaction.message
            .edit({
              embeds: [combed],
            });
        }
      }

      if (interaction.customId === 'b-panel') {
        await interaction.deferReply({ ephemeral: true });
        const data = await datas.findOne({ clientId: bot.user.id });
        const memberId = interaction.values[0];
        const member = await bot.users.fetch(memberId);
        let components = [];

        if (!data.blackListedUsers) return interaction.followUp('No data exists');
        data.blackListedUsers.map(async (b) => {
          const members = await bot.users.fetch(b);

          const options = {
            label: members.username,
            value: members.id,
            description: 'No description',
          };

          components = [
            new ActionRowBuilder().addComponents(
              new SelectMenuBuilder()
                .setCustomId('b-panel')
                .setMaxValues(1)
                .addOptions(options),
            ),
          ];
        });
        const button = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId('yes')
            .setLabel('Yes')
            .setStyle(ButtonStyle.Secondary),
          new ButtonBuilder()
            .setCustomId('no')
            .setLabel('No')
            .setStyle(ButtonStyle.Primary),
        );

        if (data?.blackListedUsers?.includes(member.id)) {
          const filter = (i) => {
            i.deferUpdate();
            return i.user.id === interaction.user.id;
          };
          await interaction
            .followUp({
              content:
							'Do you want to remove this member from the Blacklist database ?',
              components: [button],
              ephemeral: true,
            })
            .then(async (i) => {
              const collector = i.channel.createMessageComponentCollector({
                filter,
                componentType: ComponentType.Button,
                time: 10000,
              });

              collector.on('collect', async (i) => {
                if (i.customId === 'yes') {
                  const index = data.blackListedUsers.indexOf(member.id);

                  if (index > -1) {
                    data.blackListedUsers.splice(index, 1);
                  }
                  await data.save();
                  interaction.followUp({
                    content:
										'Successfully removed member from the Blacklist database.',
                    components,
                    ephemeral: true,
                  });
                } else {
                  interaction.followUp({
                    content:
										'Cancelled removed member from the Blacklist database.',
                    components,
                    ephemeral: true,
                  });
                }
              });

              collector.on('end', async (collected) => {
                await interaction.followUp({
                  content:
									'Looks like you didnt select the options to remove member from the Blacklist database.',
                  components,
                  ephemeral: true,
                });
              });
            });
        } else return interaction.followUp('User not found');
      }
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  }
});
