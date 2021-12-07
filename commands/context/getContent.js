const { ContextMenuInteraction } = require("discord.js");

module.exports = {
    name: "getcontent",
    type: "MESSAGE",
    userperm: [""],
    botperm: [""],

    /**
     *
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

      const user = await bot.users.fetch(interaction.targetId);
      
      const msg = await interaction.channel.messages.fetch(interaction.targetId);

        interaction.followUp({content: `${user.DisplayName}: ${msg}`}).catch(() => null)
        
    },
};
