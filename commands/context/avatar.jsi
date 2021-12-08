const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "Avatar",
    type: "USER",
    userperm: [""],
    botperm: [""],

    /**
     *
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

        const user = await bot.users.fetch(interaction.targetId);

        const av = new MessageEmbed()
            .setTitle(`${user.username}'s Avatar`)
.setColor(bot.color)           
          .setImage(user.displayAvatarURL({dynamic: true}));

        interaction.followUp({embeds: [av]}).catch(() => null)
        
    },
};
