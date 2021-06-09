const Discord = require('discord.js');
const db = require('quick.db');

module.exports = async (bot, message) => {
	const userlvl = db.get(`level_${message.guild.id}_${message.author.id}`);
	if(!userlvl) {
		db.set(`level_${message.guild.id}_${message.author.id}`, 1);
	}
	let level = db.get(`level_${message.guild.id}_${message.author.id}`);
	const needed = level * level * 100;
	const RandomChannelXP = Math.floor(Math.random() * 4) + 3;
	const RandomGuildXP = Math.floor(Math.random() * 4) + 2;
	const RandomXP = Math.floor(Math.random() * 4) + 1;
	db.add(`messages_${message.guild.id}_${message.author.id}`, RandomGuildXP);
	db.add(`gmessages_${message.author.id}`, RandomXP);
	db.add(`cmessages_${message.channel.id}_${message.author.id}`, RandomChannelXP);

	let GuildXP = db.get(`messages_${message.guild.id}_${message.author.id}`);
	if (GuildXP >= needed) {
		++level;
		GuildXP -= needed;
		db.set(`messages_${message.guild.id}_${message.author.id}`, GuildXP);
		db.add(`level_${message.guild.id}_${message.author.id}`, 1);
		const channel = db.get(`levelup_${message.guild.id}`) || message.channel;
		const embed = new Discord.MessageEmbed()
			.setColor('BLURPLE')
			.setDescription(`<@${message.author.id}>, You are now **level ${level}** with **base experience of ${GuildXP}**.`);
		bot.channels.cache.get(channel).send(embed);
	}
};