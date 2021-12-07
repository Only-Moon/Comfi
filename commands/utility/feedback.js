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
        const query = interaction.options.getString("msg").split("").slice(0, 2000).join("");
        if (!query) return interaction.followUp({ content: `${bot.error} Specify a **message**` });
        const feedEmbed = new MessageEmbed()
            .setTitle('Comfi™ Feedback')
            .setDescription(`**Author :**\n> ${member.user.username} \n**Message:**\n> ${query}`)
            .setFooter(`Author ID: ${member.user.id}`)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(bot.color)
        interaction.followUp({ content: "Feedback has been sent to the support server!" })
        feedCh.send({ embeds: [ feedEmbed ] }).catch( (err) => {
   return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfibot.tk/discord)`)                           
                            });
    },
};