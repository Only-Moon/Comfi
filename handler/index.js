const { glob } = require('glob');
const { promisify } = require('util');
const { ApplicationCommandType, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const Client = require('../models/Client');

/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const globPromise = promisify(glob);
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

module.exports = async (bot) => {
  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/*/*.js`);
  eventFiles.map((value) => require(value));

  // Slash

  const slashCommands = await globPromise(`${process.cwd()}/commands/*/*.js`);
  const arrayOfSlashCommands = [];
  const data = [];

  slashCommands.map((value) => {
    const file = require(value);
    if (!file?.name) return;
    bot.slashCommands.set(file.name, file);

    if ([ApplicationCommandType.User, ApplicationCommandType.Message].includes(file.type)) delete file.description;

    arrayOfSlashCommands.push({
      name: file.name,
      description: file.description,
      type: file.type ? file.type : ApplicationCommandType.ChatInput,
      options: file.options ? file.options : null,

      default_member_permissions: null,
    });

    data.push({
      name: file.name,
      description: file.description,
      directory: file.directory,
    });
  });

    const dev = process.env.DEV_MODE || 'false';
    
  (async () => {

    try {
      bot.logger.cmd('Started refreshing (/) commands');
        
      if (dev === `true`) {
        await rest.put(Routes.applicationGuildCommands(process.env.clientID, '758949191497809932'), {
          body: arrayOfSlashCommands,
        });

        bot.logger.cmd('Successfully reloaded Guild (/) commands');
      } else if (dev === `false`) {
          console.log("he")
        await rest.put(Routes.applicationCommands(process.env.clientID), {
          body: arrayOfSlashCommands,
        });
        bot.logger.cmd(
          'Successfully reloaded Application (/) commands.',
        );
      }
    } catch (error) {
      console.error(error);
    }
  })();

  bot.on('ready', async () => {
    const client = await Client.findOne({ clientId: bot.user.id });

    if (!client.commands || client.commands.length === 0) {
      client.commands.push(data);
      await client.save();
    }

    if (client.commands[0].find((cmd) => cmd?.name !== data.name)) {
      await Client.findOneAndUpdate(
        { clientId: bot.user.id },
        { $push: [{ commands: { name: data.name, description: data.description, directory: data.directory } }] },
      );
      bot.logger.cmd('Successfully reloaded application (/) commands database.');
    }
  });
};
