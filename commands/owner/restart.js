const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "restart",
    description: "Restarts the bot",
    ownerOnly: true,
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
        var spawn = require('child_process').spawn;

        await interaction.editReply({ content: "Restarting bot.." });
        if (process.env.process_restarting) {
            delete process.env.process_restarting;
            return;
        }

        spawn(process.args[0], process.argv.slice(1), {
            env: { process_restarting: 1 },
            stdio: 'ignore',
            detached: true
        }).unref();

        await interaction.editReply({ content: "I have successfully restarted!" });
        process.exit();
    },
};