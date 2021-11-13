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
        const member = interaction.member;
        const reportCh = bot.channels.cache.get('889149873893539900' || '863684464176922664');
        if(!reportCh) return;
        const query = interaction.options.getString("bug").split("").slice(0, 2000).join("");
        if (!query) return interaction.followUp({ content: "Specify a **bug**" });
        const reportEmbed = new MessageEmbed()
            .setTitle('Bug Report')
            .setDescription(`**Author :**\n> ${member.user.username} \n**Report :**\n> ${query}`)
            .setFooter(`Author ID: ${member.user.id}`)
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setTimestamp()
            .setColor(bot.color)
        interaction.followUp({ content: "Report has been sent to the report channel!" }).catch(e => {
        interaction.followUp({
          content: `${bot.error} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
          ephemeral: true
        });
});
        reportCh.send({ embeds: [reportEmbed] }).catch( (err) => {
   return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfibot.tk/discord)`)                           
                            });
    },
};