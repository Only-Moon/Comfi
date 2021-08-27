const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "feedback",
    description: "Sends feedback about Comfi to the developers",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'The feedback',
            name: 'feedback',
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
        const reportCh = bot.channels.cache.get('867650282933583882');
        const query = args.join(" ");
        if (!query) return interaction.followUp({ content: "Specify a **bug**" });
        const reportEmbed = new MessageEmbed()
            .setTitle('Comfi Feedbacl')
            .setDescription(`**Author :**\n> ${member.user.username} \n**Report :**\n > ${query}`)
            .setFooter(`Author ID: ${member.user.id}`)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor('#5539cc')
        interaction.followUp({ content: "Feedback has been sent to the bot developers!" })
        reportCh.send({ embeds: [reportEmbed] });
    },
};