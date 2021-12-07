const { CommandInteraction, MessageEmbed } = require("discord.js");
const guilds = require('../../models/guild');

module.exports = {
    name: "confession",
    description: "Confession setup for server",
    ownerOnly: false,
    options: [
      {
      type: 'SUB_COMMAND',
      name: 'enable',
      description: 'Sets channel for Confessios',
      options: [
        {
            type: 'CHANNEL',
            description: 'confess channel',
            name: 'channel',
            required: true,
            channelTypes: ["GUILD_TEXT"],
        },
    ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'disable',
            description: 'Disables the confess channel',
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

if (subcommand === 'enable') {
        let Channel = interaction.options.getChannel('channel') || interaction.guild.channels.cache.get(args[0]);

        if (Channel.type === "GUILD_VOICE") return message.channel.send(`${bot.error} Please Mention A Text Channel!`);

finalData = Channel.id
                await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  confession: true, 
                  confess_channel: finalData,
                  })

        let embed = new MessageEmbed()
        .setColor(bot.color)
        .setDescription(`Confession Channel is setted as <#${Channel.id}>`)

        return interaction.editReply({embeds: [ embed ]});
}

if (subcommand === 'disable') {

const guild = await guilds.findOne({guildId: interaction.guild.id}) 

  if (!guild.confession) return interaction.editReply(`${bot.error} Sets Confession Channel First`)

await guilds.findOneAndUpdate({guildId: interaction.guild.id}, { 
                  confession: false,
                  })

 interaction.editReply(`${bot.tick} • Removed Confession Channel`)
  
}
    }
}