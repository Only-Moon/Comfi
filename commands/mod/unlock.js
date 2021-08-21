const Discord = require('discord.js');
const { Console } = require('console');
const { Permissions } = require('discord.js')

module.exports = {
    config: {
        name: "unlock",
        category: 'mod',
        description: "unlock channel",
        aliases: []
    },
    run: async (bot, message, args) => {
        let lockPermErr = new Discord.MessageEmbed()
        .setTitle("**User Permission Error!**")
        .setDescription("**Sorry, you don't have permissions to use this! ❌**")
        
        if(!message.channel.permissionsFor(message.member).has(['PERMISSIONS.FLAGS_MANAGE_MESSAGES'])) return message.channel.send(lockPermErr);

        let channel = message.channel;

        try {
            message.guild.roles.cache.forEach(role => {
                channel.permissionOverwrites.create(role, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
            });
        } catch (e) {
            console.log(e);
        }

        message.channel.send(`Done | Channel Unlocked!`);
    }
}