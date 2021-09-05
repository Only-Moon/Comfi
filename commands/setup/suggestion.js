const { db } = require('../../Database.js');
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
        },
    ],
        },
        {
            type: 'SUB_COMMAND',
            name: 'disable',
            description: 'Disables the suggestion channel',
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
let [ subcommand ] = args;

if (subcommand === 'enable') {
        let Channel = interaction.options.getChannel('channel') || interaction.guild.channels.cache.get(args[0]);

        if (!Channel) return interaction.editReply(`Please Mention A Channel!`);

        if (Channel.type === "GUILD_Voice") return interaction.editReply(`Please Mention A Text Channel!`);

        await db.set(`suggestion_${interaction.guild.id}`, Channel.id);

        let embed = new MessageEmbed()
        .setColor("00FFFF")
        .setDescription(`<:yes_HE:778611379560120320>  | Suggestion Channel is setted as <#${Channel.id}>`)

        return interaction.editReply({embeds: [ embed ]});
}

if (subcommand === 'disable') {

let ch = await db.get(`suggestion_${interaction.guild.id}`)

if (!ch) return interaction.editRepl(`<a:Attention:883349868062576701> You need to set channel first`)

await db.delete(`suggestion_${interaction.guild.id}`) 
return interaction.editReply(`Successfully Removed Suggestion Channel`)
  
}
    }
};