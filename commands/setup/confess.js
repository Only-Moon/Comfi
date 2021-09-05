const { CommandInteraction, MessageEmbed } = require("discord.js");
const { db } = require('../../Database.js');

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
        },
    ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'disable',
            description: 'Disables the confess channel',
        },
    ],
    userperm: ["MANAGE_SERVER"],
    botperm: ["MANAGE_SERVER"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
let [ subcommand ] = args

if (subcommand === 'enable') {
        let Channel = interaction.options.getChannel('channel') || interaction.guild.channels.cache.get(args[0]);

        if (Channel.type === "GUILD_VOICE") return message.channel.send(`<a:Attention:883349868062576701>P lease Mention A Text Channel!`);

        await db.set(`confession_${interaction.guild.id}`, Channel.id);

        let embed = new MessageEmbed()
        .setColor("00FFFF")
        .setDescription(`Confession Channel is setted as <#${Channel.id}>`)

        return interaction.editReply({embeds: [ embed ]});
}

if (subcommand === 'disable') {

let ch = await db.get(`confession_${interaction.guild.id}`)
  if (!ch) return interaction.editReply(`<a:Attention:883349868062576701> Sets Confession Channel First`)

  await db.delete(`confession_${interaction.guild.id}`)
 interaction.editReply(`Removed Chatbot Channel`)
  
}
    }
}