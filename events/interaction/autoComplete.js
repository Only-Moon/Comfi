/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const { InteractionType } = require('discord.js');
const bot = require('../../index');
const guilds = require('../../models/guild');

/**
 * Fetches data from a URL using node-fetch.
 *
 * @param  {...any} args - Arguments to pass to node-fetch.
 * @returns {Promise} Promise resolving to the fetch response.
 */
bot.on('interactionCreate', async (interaction) => {
  if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
    const userInput = interaction.options.getFocused().toString();
      const guild = await guilds.findOne({ guildId: interaction.guild.id });

    if (interaction.commandName === 'npm') {
      const text = interaction.options.getString('name'); // This takes the string value from the slash option in the npm command
      const url = await fetch(`https://api.npms.io/v2/search?q=${text}`).then((response) => response.json());

      if (!text) {
        return interaction.respond([{

          name: 'Type the name of an npm package for more options to show!',

          value: userInput,

        }]).catch(() => null);
      }

      const filtered = url.results.filter((x) => x.package.name.includes(text));

      await interaction.respond(

        filtered.map((choice) => ({

          name: choice.package.name,

          value: choice.package.name,

        })).slice(0, 25), // This is done due to discord only allowing 25 choices with autocomplete

      ).catch((err) => {
        
      });
    } 
      if (interaction.commandName === 'dropdownrole') {

      const id = interaction.options.getString('id');

      if (!id) {
        return interaction.respond([{

          name: 'Check dropdown id from `/dropdown list` command and provide here to remove"!',

          value: userInput,

        }]).catch(() => null);
      }
      const filtered = [];
      guild.dropdownRoles.forEach((choice) => {
        filtered.push({
          name: choice.id,

          value: choice.id,
        });
      });
      await interaction.respond(

        filtered.map((choice) => ({

          name: choice.name,

          value: choice.value,

        })).slice(0, 25), // This is done due to discord only allowing 25 choices with autocomplete

      ).catch((err) => {
        
      });
    } 
      if (interaction.commandName === 'job') {
      const data = await bot.eco.SetJob({
        UserID:
interaction.user.id,
        Job: 'none',
      });

      const id = interaction.options.getString('job');

      if (!id) {
        return interaction.respond([{

          name: 'Check job name from `/job list` command and provide here to add or remove"!',

          value: userInput,

        }]).catch(() => null);
      }
      const filtered = [];

      data.value.forEach((item) => {
        filtered.push({
          name: item.Name,
          value: item.Name,
        });
      });

      await interaction.respond(

        filtered.map((choice) => ({

          name: choice.name,

          value: choice.value,

        })).slice(0, 25), // This is done due to discord only allowing 25 choices with autocomplete

      ).catch((err) => {
        
      });
    } 
    const cmdArray = ["embed", "boost", "welcome", "leave", "leveling" ]
      if (cmdArray.includes(interaction.commandName)) {

              const id = interaction.options.getString('name');

      if (!id) {
        return interaction.respond([{

          name: 'Check list of embeds using `/embed list` and then enter the name here"!',

          value: userInput,

        }]).catch(() => null);
      }

      await interaction.respond(

    guild.embeds.map((embed) => ({

          name: embed.name.replace(/(\w)(\w*)/g,
        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();}),

          value: embed.name.replace(/(\w)(\w*)/g,
        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();}),

        })).slice(0, 25), // This is done due to discord only allowing 25 choices with autocomplete

      ).catch((err) => {
        
      });
    
    }     
  }
});
