/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, MessageEmbed } = require("discord.js");
const guilds = require('../../models/guild');

module.exports = {
    name: "confession",
    description: "Anonymous Confession setup for server",
    ownerOnly: false,
  directory: "setting",
    options: [
      {
      type: 'SUB_COMMAND',
      name: 'enable',
      description: 'Sets channel for Confession',
      options: [
        {
            type: 'CHANNEL',
            description: 'channel for confession',
            name: 'channel',
            required: true,
            channelTypes: ["GUILD_TEXT"],
        },
    ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'disable',
            description: 'Disables the confession channel',
        },
    ],
    userperm: ["MANAGE_GUILD"],
    botperm: ["MANAGE_GUILD"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
let [ subcommand ] = args

const guild = await guilds.findOne({guildId: interaction.guild.id}) 
if (subcommand === 'enable') {
        let Channel = interaction.options.getChannel('channel') || interaction.guild.channels.cache.get(args[0]);

  if (guild.confession_channel === Channel.id) {

        return await  bot.errorEmbed(bot, interaction, `**Confession Channel is already set as ${Channel} !**`)
    
  } else {

finalData = Channel.id
                await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  confession: true, 
                  confess_channel: finalData,
                  })

        return await bot.successEmbed(bot, interaction, `**Successfully Set Confession Channel as ${Channel} !**`);
}
}

if (subcommand === 'disable') {

const guild = await guilds.findOne({guildId: interaction.guild.id}) 

  if (!guild.confession) return await  bot.errorEmbed(bot, interaction, `**Enable Confession Channel First !**`)

await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  confession: false,
                  })

        return await bot.successEmbed(bot, interaction, `**Successfully Disabled Confession Channel !**`)
  
}
    }
}