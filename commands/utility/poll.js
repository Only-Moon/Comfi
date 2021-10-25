const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "poll",
    description: "Start a simple poll in the server",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'question for poll',
            name: 'question',
            required: true,
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
   const embed = new MessageEmbed()
            .setColor(bot.color)
            .setTitle(`Poll For ${interaction.guild.name} Sever`)
            .setFooter(`${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
            .setDescription(args[0])
        var msg = await interaction.channel.send({embeds: [ embed ]});

        await msg.react(`${bot.tick}`);
        await msg.react(`${bot.crosss}`);

    interaction.deleteReply({ timeout: 1000 });
    }
}