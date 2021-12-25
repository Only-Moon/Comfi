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

const ques = interaction.options.getString("question").split("").slice(0, 4000).join("")
      
   const embed = new MessageEmbed()
            .setColor(bot.color)
            .setTitle(`Poll For ${interaction.guild.name} Sever`)
            .setFooter(`${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
            .setDescription(`${ques}`)
        var msg = await interaction.channel.send({embeds: [ embed ]}).catch(() => null);

        await msg.react(`${bot.tick}`);
        await msg.react(`${bot.crosss}`);

    interaction.deleteReply({ timeout: 1000 }).catch(() => null)
    }
}