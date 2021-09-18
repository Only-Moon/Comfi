const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "feedback",
    description: "Gives Feedback To Devs About Comfi",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'The feedback',
            name: 'msg',
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
        const feedCh = bot.channels.cache.get('881789379809513500');
        const query = args.join(" ");
        if (!query) return interaction.followUp({ content: `${bot.error} Specify a **message**` });
        const feedEmbed = new MessageEmbed()
            .setTitle('Comfi™ Feedback')
            .setDescription(`**Author :**\n> ${member.user.username} \n**Message:**\n > ${query}`)
            .setFooter(`Author ID: ${member.user.id}`)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(bot.color)
        interaction.followUp({ content: "Report has been sent to the report channel!" })
        feedCh.send({ embeds: [ feedEmbed ] });
    },
};