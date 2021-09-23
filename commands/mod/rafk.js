const { db } = require('../../Database.js');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "rafk",
    description: "Removes your afk if you have set one",
    ownerOnly: false,
    userperm: [""],
    botperm: ["MANAGAE_NICKNAMES"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
        const check = await db.get(`afk-${interaction.user.id}+${interaction.guild.id}`)
        if(!check) {
      interaction.editReply(`${bot.error} You have not been on afk till now`);
        } else {
        const embed = new MessageEmbed()
        .setDescription(`Your afk has been removed`)
        .setColor("#F4B3CA")
        .setAuthor(`${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
        .setTimestamp();

if(interaction.member.manageable) interaction.member.setNickname('')
    interaction.editReply({ embeds: [ embed ]})                
        }
    }
};