const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const { db } = require('../Database')
const simplydjs = require('simply-djs')
const db1 = require('old-wio.db');
const wb = require('quick.db');
const moment = require('moment');
const ms = require('ms');
const pms = require('pretty-ms');
const fetch = require('node-fetch');
const { PREFIX } = require("../config.js");

module.exports.run = async (bot, message) => {

 	if (message.author.bot || !message.guild || message.webhookID) return;

	let ch = await db.get(`chatbot_${message.guild.id}`)

  if (!ch) return console.log('no val in chid');

simplydjs.chatbot(bot, message, {
chid: `${ch}`,
name: '', // default: Your bot na
developer: `Moonbow, Rahuletto`,
})

	let Prefix = await db.get(`prefix_${message.guild.id}`);
	if (!Prefix) Prefix = PREFIX;

	const mentionRegex = RegExp(`^<@!?${bot.user.id}>$`);

	if (message.content.match(mentionRegex)) {
		message.channel.send(
			new Discord.MessageEmbed()
				.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)
				.setDescription(
					`Hey <@${
						message.author.id
					}>, My prefix for this guild is \`\`\`${Prefix}\`\`\`.Use \`\`\`${Prefix}help\`\`\` or <@${
						bot.user.id
					}> help to get a list of commands`
				)
				.setColor('RANDOM')
				.setFooter(`Requested by ${message.author.username}`)
				.setTimestamp()
		);
	}


	const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	const prefixRegex = new RegExp(
		`^(<@!?${bot.user.id}>|${escapeRegex(Prefix)})\\s*`
	);

	if (!prefixRegex.test(message.content)) return;

	const [, matchedPrefix] = message.content.match(prefixRegex);
	Prefix = matchedPrefix;

	if (!message.content.startsWith(Prefix)) return;

	if (!message.guild.me.permissionsIn(message.channel).has('EMBED_LINKS'))
		return message.reply(
			'**:x: I am missing the Permission to `EMBED_LINKS`**'
		);

	let args = message.content
		.slice(matchedPrefix.length)
		.trim()
		.split(/ +/g);
	let cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let ops = {
		queue2: bot.queue2,
		queue: bot.queue,
		queue3: bot.queue3,
		games: bot.games
	};

	let command = bot.commands.get(cmd);
	// If none is found, try to find it by alias
	if (!command) command = bot.commands.get(bot.aliases.get(cmd));

	// If a command is finally found, run the command
	if (command) command.run(bot, message, args);

      

	let cmdx = wb.fetch(`cmd_${message.guild.id}`);

	if (cmdx) {
		let cmdy = cmdx.find(x => x.name === cmd);
		if (cmdy)
			message.channel.send(
				cmdy.responce
					.replace(/{user}/g, `${message.author}`)

					.replace(/{user_tag}/g, `${message.author.tag}`)
					.replace(/{user_name}/g, `${message.author.username}`)
					.replace(/{user_ID}/g, `${message.author.id}`)
					.replace(/{guild_name}/g, `${message.guild.name}`)
					.replace(/{guild_ID}/g, `${message.guild.id}`)
					.replace(/{memberCount}/g, `${message.guild.memberCount}`)
					.replace(/{size}/g, `${message.guild.memberCount}`)
					.replace(/{guild}/g, `${message.guild.name}`)
					.replace(
						/{member_createdAtAgo}/g,
						`${moment(message.author.createdTimestamp).fromNow()}`
					)
					.replace(
						/{member_createdAt}/g,
						`${moment(message.author.createdAt).format(
							'MMMM Do YYYY, h:mm:ss a'
						)}`
					)
			);
	}

if (db1.has(`afk-${message.author.id}+${message.guild.id}`)) {
		const info = db1.fetch(`afk-${message.author.id}+${message.guild.id}`);
		await db1.delete(`afk-${message.author.id}+${message.guild.id}`);
		await db1.delete(`aftime-${message.author.id}+${message.guild.id}`);
		message.channel.send(
			`Welcome back ${message.author.username}, Great to see you!!`
		);
	}
	//checking for mentions
	if (message.mentions.members.first()) {
		if (
			db1.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)
		) {
			const reason = db1.fetch(
				`afk-${message.mentions.members.first().id}+${message.guild.id}`
			);
			let time = db1.fetch(
				`aftime-${message.mentions.members.first().id}+${message.guild.id}`
			);
			time = Date.now() - time;
			return message.channel.send(
				`**${
					message.mentions.members.first().user.username
				} is now afk - ${reason} - ${format(time)} ago**`
			);
		}
	}


function parseMs(str) {
	const parts = str.split(' ');
	const msParts = parts.map(part => ms(part));
	if (msParts.includes(undefined)) return undefined;
	const res = msParts.reduce((a, b) => a + b);
	return res;
}

function decodeMs(num) {
	return pms(num);
}

  
}