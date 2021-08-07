const { MessageEmbed } = require('discord.js');
const { Permissions } = require('discord.js')

module.exports = {
    config: {
        name: "poll",
        aliases: [""],
        description: "Start a simple poll in the server",
        category: "utility",
        usage: "poll <question>",
    },
    run: async (bot, message, args) => {
        if (!message.member.permissions.has('PERMISSIONS.FLAGS_MANAGE_GUILD')) return message.channel.send("**You Do Not Have Sufficient Permissions! - [MANAGE_GUILD]**");

        if (!args[0])
            return message.channel.send("**Please Enter A Query!**");

        const embed = new MessageEmbed()
            .setColor("GREEN")
            .setTitle(`Poll For ${message.guild.name} Sever`)
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            .setDescription(args.join(' '))
        var msg = await message.channel.send({embeds: [ embed ]});

        await msg.react('<:yes_HE:778611379560120320>');
        await msg.react('<:no_HE:778611410539905044> ');

        message.delete({ timeout: 1000 });
    }
}