const { CommandInteraction, MessageEmbed } = require("discord.js");
const Levels = require("discord-xp");

module.exports = {
    name: "leaderboard",
    description: "Leaderboard for the guild",
    ownerOnly: false,
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {

const rawLeaderboard = await Levels.fetchLeaderboard(interaction.guild.id, 10); 

if (rawLeaderboard.length < 1) return reply("Nobody's in leaderboard yet.");

const leaderboard = await Levels.computeLeaderboard(bot, rawLeaderboard, true);

const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}\nLevel: ${e.level}\nXP: ${e.xp.toLocaleString()}`); // We map the outputs.

const embed = new MessageEmbed()
    .setTitle("Server Leaderboard")
       .setDescription(`${lb.join("\n\n")}`)
.setColor("#F4B3CA")

interaction.editReply({embeds: [ embed ]})
      
}
}