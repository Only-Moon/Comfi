const { db } = require('../../Database.js');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "set-suggestion",
    description: "Sets Suggestion Server for the Server",
    ownerOnly: false,
    options: [
        {
            type: 'CHANNEL',
            description: 'Mention the Channel',
            name: 'channel',
            required: true,
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

        let Channel = interaction.options.getChannel('channel') || interaction.guild.channels.cache.get(args[0]);

        if (!Channel) return interaction.editReply(`Please Mention A Channel!`);

        if (Channel.type === "GUILD_Voice") return interaction.editReply(`Please Mention A Text Channel!`);

        await db.set(`suggestion_${interaction.guild.id}`, Channel.id);

        let embed = new MessageEmbed()
        .setColor("00FFFF")
        .setDescription(`<:yes_HE:778611379560120320>  | Suggestion Channel is setted as <#${Channel.id}>`)

        return interaction.editReply({embeds: [ embed ]});

    }
};