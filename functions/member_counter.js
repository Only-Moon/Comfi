const guilds = require(`../models/guild`)
const { Message } = require('discord.js')

module.exports = async (bot) => {
        bot.guilds.cache.forEach(async (g) => {
            setTimeout(async () => {
    const guild = await guilds.findOne({guildId: g.id})
          if(guild?.member_counter) {
                    const channel = g.channels.cache.find(c => c.id === guild.member_counter_channel && c.type === guild.member_counter_channel_type)
                    if(!channel) return;
                    channel.setName(`${guild.member_counter_channel_name}${g.members.cache.filter(member => !member.user.bot).size}`)
                }
            }, 3000);
        })
}