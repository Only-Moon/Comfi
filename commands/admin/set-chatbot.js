const { MessageEmbed, Permissions } = require("discord.js");
const { db } = require('../../Database.js');

module.exports = {
	config: {
		name: 'set-chatbot-channel',
		aliases: ['set-chatbot'],
		category: "admin",
		description: 'Sets chatbot channel',
		usage: 'set-chatbot'
	},
	run: async (bot, message, args) => {
    if (!message.member.permissions.has("PERMISSIONS.FLAGS_MANAGE_CHANNELS")) return message.channel.send("You Don't Have Enough Permission To Execute This Command - Manage Channels");

        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "GUILD_Voice") return message.channel.send(`Please Mention A Text Channel!`);

        await db.set(`chatbot_${message.guild.id}`, Channel.id);

        let embed = new MessageEmbed()
        .setColor("00FFFF")
        .setDescription(`<:yes_HE:778611379560120320>  | Chatnot Channel is setted as <#${Channel.id}>`)

        return message.channel.send({embeds: [ embed ]});

    }
};