const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const Enmap = require('enmap');
const smartestchatbot = require('smartestchatbot');
const db = require('old-wio.db');
const wb = require('quick.db');
const moment = require('moment');
const ms = require('ms');
const pms = require('pretty-ms');
const { PREFIX } = require("../config.js");

module.exports.run = async (bot, message) => {

 	if (message.author.bot || !message.guild || message.webhookID) return;

	let Prefix = await db.fetch(`prefix_${message.guild.id}`);
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



   bot.setups = new Enmap({ name: 'setups', dataDir: './databases/setups' });
	let disabled = new MessageEmbed()
		.setColor('#FF0000')
		.setDescription('Chat Bot is disabled by the Owner in this Server!')
		.setFooter(`Requested by ${message.author.username}`);

	if (message.author.bot || !message.guild) return;
	bot.setups.ensure(
		message.guild.id,
		{
			enabled: false,
			channel: ''
		},
		'aichatsystem'
	);

	let chatbot = bot.setups.get(message.guild.id, 'aichatsystem');

	if (message.channel.id == chatbot.channel) {
		if (!chatbot.enabled)
			return message.author.send(disabled).catch(e => console.log(e));

    if (message.author.bot) return;
    message.content = message.content.replace(/@(everyone)/gi, "everyone").replace(/@(here)/gi, "here");
    if (message.content.includes(`@`)) {
      return message.lineReply(`**:x: Please dont mention anyone**`);
    }
    message.channel.startTyping();
    if (!message.content) return message.lineReply("Please say something.");
    
    const scb = new smartestchatbot.Client()

    scb.chat({message: message.content, name: bot.user.username, owner:"Moonbow", user: message.author.id, language:"en"}).then(reply => { 
      message.lineReply(`${reply}`); 
      
    }) 
    message.channel.stopTyping(); 
	  
	}

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

if (db.has(`afk-${message.author.id}+${message.guild.id}`)) {
		const info = db.fetch(`afk-${message.author.id}+${message.guild.id}`);
		await db.delete(`afk-${message.author.id}+${message.guild.id}`);
		await db.delete(`aftime-${message.author.id}+${message.guild.id}`);
		message.channel.send(
			`Welcome back ${message.author.username}, Great to see you!!`
		);
	}
	//checking for mentions
	if (message.mentions.members.first()) {
		if (
			db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)
		) {
			const reason = db.fetch(
				`afk-${message.mentions.members.first().id}+${message.guild.id}`
			);
			let time = db.fetch(
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