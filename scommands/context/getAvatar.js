const { ContextMenuInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "getavatar",
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
            .setImage(user.displayAvatarURL({dynamic: true}));

        interaction.followUp({embeds: [av]})
        
    },
};
