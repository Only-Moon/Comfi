/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const {
  CommandInteraction,
  ActionRowBuilder,
  SelectMenuBuilder,
  EmbedBuilder,
  ApplicationCommandOptionType,
} = require('discord.js');
const clients = require('../../models/Client');

module.exports = {
  name: 'command',
  description: "Enable or Disable Comfi's commands ",
  ownerOnly: true,
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'disable a command',
      name: 'disable',
      options: [
        {
          name: 'name',
          type: ApplicationCommandOptionType.String,
          description: 'command name to disable',
          required: true,
        },
      ],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      description: 'enable a command',
      name: 'enable',
      options: [
        {
          name: 'name',
          type: ApplicationCommandOptionType.String,
          description: 'name of command to enable',
          required: true,
        },
      ],
    },
  ],
  userperm: ['ADMINISTRATOR'],
  botperm: ['MANAGE_GUILD'],
  /**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */

  run: async (bot, interaction, args) => {
    const [choice] = args;

    const name = interaction.options.getString('name');
    const client = await clients.findOne({ clientId: bot.user.id });

    if (choice === 'disable') {
      const validCommand = bot.slashCommands.find(
        (cmd) => cmd.name.toLowerCase() === name.toLowerCase(),
      );
      if (!validCommand) {
        return await bot.errorEmbed(bot, interaction, 'Please supply a valid command!');
      }
      client.blackListedCmds.push(validCommand.name);
      await client.save();

      return await bot.successEmbed(bot, interaction, `Command \`${
        validCommand.name
      }\` has been disabled!`);
    } if (choice === 'enable') {
      const validCommand = bot.slashCommands.find(
        (cmd) => cmd.name.toLowerCase() === name.toLowerCase(),
      );
      if (!validCommand) {
        return await bot.errorEmbed(bot, interaction, 'Please supply a valid command!');
      }
      if (!client.blackListedCmds.includes(validCommand.name)) {
        return await bot.errorEmbed(bot, interaction, 'Please supply a valid disabled command!');
      } if (client.blackListedCmds.includes(validCommand.name)) {
        await clients.findOneAndUpdate(
          {
            clientId: bot.user.id,
          },
          {
            $pull: { blackListedCmds: validCommand.name },
          },
        );

        return await bot.successEmbed(bot, interaction, `Command \`${
          validCommand.name
        }\` has been enabled!`);
      }
    }
  },
};
