const { MessageEmbed } = require('discord.js');
const { wrongemoji } = require("../../config.js");
const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    config: {
  name: "lb",
  aliases: ["leaderboard"],
  description: "Shows the message experience leaderboard",
  usage: "leaderboard <global|guild|channel>",
  category: "leveling",
    },
    run: async (bot, message, args) => {
	if (args[0] !== 'global' && args[0] !== 'channel' && args[0] !== 'guild') {
		const embed = new MessageEmbed()
			.setColor('#f04947')
			.setDescription(`${bot.config.wrongemoji} **| Please enter a valid value between \`global\`, \`channel\` and \`guild\`!**`);
		return message.channel.send(embed);
	}
	if (args[0] === 'global') {
		const leaderboard = db.all()
			.filter(data => data.ID.startsWith('gmessages'))
			.sort((a, b) => b.data - a.data)
			.slice(0, 10);
		let lb = '';
		for (let i = 0; i < leaderboard.length; i++) {
			const user = bot.users.cache.get(leaderboard[i].ID.split('_')[1]) ? bot.users.cache.get(leaderboard[i].ID.split('_')[1]).tag : 'Unknown User';
			lb += `**${i + 1})** ${user} **~**  ${leaderboard[i].data.toLocaleString()}\n`;
		}
		const embed = new MessageEmbed()
			.setColor('BLURPLE')
			.setAuthor('Global Leaderboard', bot.user.displayAvatarURL())
			.setTitle('Leaderboard for global message experience')
			.setThumbnail(bot.user.displayAvatarURL())
			.setDescription(`${lb}`)
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		return message.channel.send(embed);
	}
	if (args[0] === 'channel') {
		const leaderboard = db.all()
			.filter(data => data.ID.startsWith(`cmessages_${message.channel.id}`))
			.sort((a, b) => b.data - a.data)
			.slice(0, 10);
		let lb = '';
		for (let i = 0; i < leaderboard.length; i++) {
			const user = bot.users.cache.get(leaderboard[i].ID.split('_')[2]) ? bot.users.cache.get(leaderboard[i].ID.split('_')[2]).tag : 'Unknown User';
			lb += `**${i + 1})** ${user} **~**  ${leaderboard[i].data.toLocaleString()}\n`;
		}
		const embed = new MessageEmbed()
			.setColor('BLURPLE')
			.setAuthor(`#${message.channel.name} Channel Leaderboard`, message.guild.iconURL({ dynamic: true }))
			.setTitle(`Leaderboard for #${message.channel.name} channel`)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setDescription(`${lb}`)
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		return message.channel.send(embed);
	}
	if (args[0] === 'guild') {
		const leaderboard = db.all()
			.filter(data => data.ID.startsWith(`messages_${message.guild.id}`))
			.sort((a, b) => b.data - a.data)
			.slice(0, 10);
		let lb = '';
		for (let i = 0; i < leaderboard.length; i++) {
			const user = bot.users.cache.get(leaderboard[i].ID.split('_')[2]) ? bot.users.cache.get(leaderboard[i].ID.split('_')[2]).tag : 'Unknown User';
			lb += `**${i + 1})** ${user} **~**  ${leaderboard[i].data.toLocaleString()}\n`;
		}
		const embed = new MessageEmbed()
			.setColor('BLURPLE')
			.setAuthor(`${message.guild.name} Server Leaderboard`, message.guild.iconURL({ dynamic: true }))
			.setTitle(`Leaderboard for ${message.guild.name} server`)
			.setThumbnail(message.guild.iconURL({ dynamic: true }))
			.setDescription(`${lb}`)
			.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
			.setTimestamp();
		return message.channel.send(embed);
        }
    }
};
