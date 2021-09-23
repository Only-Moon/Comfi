const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "bugreport",
    description: "Report a bug",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'The bug',
            name: 'bug',
            required: true,
        },
    ],
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;
        const reportCh = bot.channels.cache.get('889149558335111179');
        const query = args.join(" ");
        if (!query) return interaction.followUp({ content: "Specify a **bug**" });
        const reportEmbed = new MessageEmbed()
            .setTitle('Bug Report')
            .setDescription(`**Author :**\n> ${member.user.username} \n**Report :**\n > ${query}`)
            .setFooter(`Author ID: ${member.user.id}`)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('#5539cc')
        interaction.followUp({ content: "Report has been sent to the report channel!" })
        reportCh.send({ embeds: [reportEmbed] });
    },
};