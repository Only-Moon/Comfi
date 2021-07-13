const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const db = require("quick.db");

module.exports = {
	config: {
		name: 'setsuggest',
		category: 'admin',
		description: "Sets the server suggestion channel",
		usage: 'setsuggest <#channel>',
		example: 'setsuggest #channel',
		aliases: ['set-suggestion']
	},

	run: async (bot, message, args) => {

        let Channel = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

        if (!Channel) return message.channel.send(`Please Mention A Channel!`);

        if (Channel.type === "voice") return message.channel.send(`Please Mention A Text Channel!`);

        await db.set(`suggestion_${message.guild.id}`, Channel.id);

        let Embed = new MessageEmbed()
        .setColor("00FFFF")
        .setDescription(`<:yes_HE:778611379560120320>  | Suggestion Channel is setted as <#${Channel.id}>`)

        return message.channel.send(Embed);

    }
};