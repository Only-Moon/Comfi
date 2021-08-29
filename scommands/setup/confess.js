const { CommandInteraction, MessageEmbed } = require("discord.js");
const { db } = require('../../Database.js');

module.exports = {
    name: "set-confess",
    description: "Sets a confess channel for server",
    ownerOnly: false,
    options: [
        {
            type: 'CHANNEL',
            description: 'Channel for confession',
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

        let Channel = interaction.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "GUILD_VOICE") return message.channel.send(`Please Mention A Text Channel!`);

        await db.set(`confession_${interaction.guild.id}`, Channel.id);

        let embed = new MessageEmbed()
        .setColor("00FFFF")
        .setDescription(`Confession Channel is setted as <#${Channel.id}>`)

        return interaction.editReply({embeds: [ embed ]});

    }
}