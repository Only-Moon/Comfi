/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const guilds = require('../../models/guild');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggestion",
    description: "Sets Suggestion Server for the Server",
    ownerOnly: false,
   directory: "setting",
    options: [
      {
      type: 'SUB_COMMAND',
      name: 'enable',
      description: 'Sets channel Suggestions',
      options: [
        {
            type: 'CHANNEL',
            description: 'channel for suggestion',
            name: 'channel',
            required: true,
            channelTypes: ["GUILD_TEXT"],
        },
    ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'disable',
            description: 'Disables the suggestion channel',
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
let [ subcommand ] = args;

const guild = await guilds.findOne({guildId: interaction.guild.id })
      
try {
  if (subcommand === 'enable') {
        let Channel = interaction.options.getChannel('channel') || interaction.guild.channels.cache.get(args[0]);

        if (!Channel) return await  bot.errorEmbed(bot, interaction, `**Please Mention A Channel !**`);

if (guild.suggestions_channel === Channel.id) {
        return await  bot.errorEmbed(bot, interaction, `**Suggestion Channel is already set as ${Channel} !**`)

} else {
  await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  suggestions: true, 
                  suggestions_channel: Channel.id,
                  })

        return await bot.successEmbed(bot, interaction, `**Suggestion Channel is setted as <#${Channel.id}> !**`)
}

}
if (subcommand === 'disable') {

await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  suggestions: false, 
                  })
return await bot.successEmbed(bot, interaction, `**Successfully Removed Suggestion Channel !**`)
  
}
    }
 catch (e) {
			let emed = new MessageEmbed()
				.setTitle(`${bot.error} • Error Occured`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
				.setColor(bot.color)

			bot.sendhook(null, {
				channel: bot.err_chnl,
				embed: emed
			})

			interaction.followUp({
				embeds: [
					{
						description: `${
							bot.error
						} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
						color: bot.color
					}
				]
			})
}}};