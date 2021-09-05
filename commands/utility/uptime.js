const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "uptime",
    description: "Shows Uptime of bot",

  run: async(bot, interaction, args) => {
        let days = Math.floor(bot.uptime / 86400000);
        let hours = Math.floor(bot.uptime / 3600000) % 24;
        let minutes = Math.floor(bot.uptime / 60000) % 60;
        let seconds = Math.floor(bot.uptime / 1000) % 60;

        const embed = new MessageEmbed()
            .setTitle("Uptime")
            .setColor("#F4B3CA")
            .setDescription(`I am Online from **${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds`)
            .setThumbnail(bot.user.displayAvatarURL())
            .setFooter(`${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true}))
            .setAuthor(bot.user.username, bot.user.displayAvatarURL())  
        interaction.editReply({embeds: [ embed ]});
    }
}