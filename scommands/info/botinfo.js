const { MessageEmbed,CommandInteraction } = require ("discord.js")
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');

module.exports = {
    name: 'botinfo',
    description: 'Check\'s bot\'s status',
    ownerOnly: false,
    userperm: [""],
    botperm: [""],
    /** 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
     run: async(bot, interaction, args) => {
      let embed = new MessageEmbed()
            .setColor('#F4B3CA')
            .setAuthor(`${bot.user.username} v${version}`, bot.user.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .addField('❯ Uptime :', `${ms(bot.uptime)}`, true)
            .addField('❯ WebSocket Ping:', `${bot.ws.ping}ms`, true)
            .addField('❯ Memory:', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, true)
            .addField('❯ Guild Count:', `${bot.guilds.cache.size} guilds`, true)
            .addField(`❯ User Count:`, `${bot.guilds.cache.reduce((users , value) => users + value.memberCount, 0)} users`, true)
            .addField('❯ Commands:', `${bot.commands.size} cmds`,true)
            .addField('❯ Node:', `${process.version} on ${process.platform} ${process.arch}`, true)
            .addField('❯ Cached Data:', `${bot.users.cache.size} users\n${bot.emojis.cache.size} emojis`, true)
            .addField('❯ Discord.js:', `${discordjsVersion}`, true)
            .setFooter(`Requested By ${interaction.member.username}`)
            .setTimestamp();
   interaction.followUp({embeds: [ embed ]})
  }
}
