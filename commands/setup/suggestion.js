const guilds = require('../../models/guild');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "suggestion",
    description: "Sets Suggestion Server for the Server",
    ownerOnly: false,
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

if (subcommand === 'enable') {
        let Channel = interaction.options.getChannel('channel') || interaction.guild.channels.cache.get(args[0]);

        if (!Channel) return interaction.editReply(`${bot.error} Please Mention A Channel!`);

        if (Channel.type === "GUILD_Voice") return interaction.editReply(`${bot.error} Please Mention A Text Channel!`);

await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  suggestions: true, 
                  suggestions_channel: Channel,
                  })

        let embed = new MessageEmbed()
        .setColor(bot.color)
        .setDescription(`${bot.tick} • Suggestion Channel is setted as <#${Channel.id}>`)

        return interaction.editReply({embeds: [ embed ]});
}

if (subcommand === 'disable') {

await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  suggestions: false, 
                  })
return interaction.editReply(`${bot.tick} • Successfully Removed Suggestion Channel`)
  
}
    }
};