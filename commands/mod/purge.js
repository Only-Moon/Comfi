const { ownerID } = require('../../owner.json') 
const { Permissions } = require('discord.js')

module.exports = {
    config: {
        name: "purge",
        aliases: [],
        category: "mod",
        description: "Deletes messages from a channel",
        usage: "purge [amount of messages]"
    },
    run: async (bot, message, args) => {
      
         try { if (!message.member.permissions.has("PERMISSIONS.FLAGS_MANAGE_MESSAGES")) return message.channel.send("You Don't Have Sufficient Permissions!- [MANAGE_MESSAGES]")
        if (isNaN(args[0]))
            return message.channel.send('**Please Supply A Valid Amount To Delete Messages!**');

        if (args[0] > 100)
            return message.channel.send("**Please Supply A Number Less Than 100!**");

        if (args[0] < 1)
            return message.channel.send("**Please Supply A Number More Than 1!**");

        message.channel.bulkDelete(args[0])
            .then(messages => message.channel.send(`**Succesfully deleted \`${messages.size}/${args[0]}\` messages**`).then(msg => msg.delete({ timeout: 5000 }))).catch(() => null)
         } catch (e) {
            let embed = new Discord.MessageEmbed()
            .setColor("#FF0000")
            .setTitle(`:x: Error!`)
            .setDescription(e)

            message.channel.send({embeds: [ embed ]});

        }
    }
}