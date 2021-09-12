const bot = require("../index");
const { MessageEmbed } = require('discord.js');
const { db } = require('../Database')
const moment = require('moment');
const ms = require('ms');
const pms = require('pretty-ms');
const { PREFIX } = "/";

bot.on("messageCreate", async (message) => {

 	if (message.author.bot || !message.guild || message.webhookID) return;  
	
let Prefix = await db.get(`prefix_${message.guild.id}`);	if (!Prefix) Prefix = PREFIX;
  const mentionRegex = new RegExp(`^<@!?${bot.user.id}>$`);
	if (message.content.match(mentionRegex)) {				
    let ping = new MessageEmbed()				
.setThumbnail(`${message.author.displayAvatarURL({ dynamic: true })}`)				
    .setDescription(				
      `Hey <@${						
message.author.id					
}>, My prefix for this this guild is **/** \n
Use \`\`\`/help\`\`\` \n for get a list of commands.`				
    )				
    .setColor(bot.color)				
    .setFooter(`Requested by ${message.author.username}`)				
    .setTimestamp();	
	
 message.reply({embeds: [ ping ]})                                         }

	const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');	
  const prefixRegex = new RegExp(		`^(<@!?${bot.user.id}>|${escapeRegex(Prefix)})\\s*`	);
	if (!prefixRegex.test(message.content)) return;
	const [matchedPrefix] = message.content.match(prefixRegex);	Prefix = matchedPrefix;

	if (!message.content.startsWith(Prefix)) return;

	
if (!message.guild.me.permissionsIn(message.channel).has('EMBED_LINKS'))	
  return message.reply('**:x: I am missing the Permission to `EMBED_LINKS`**');
	let args = message.content		.slice(matchedPrefix.length)		
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

if (await db.has(`afk-${message.author.id}+${message.guild.id}`)) {
		const info = await db.get(`afk-${message.author.id}+${message.guild.id}`);
		await db.delete(`afk-${message.author.id}+${message.guild.id}`);
		await db.delete(`aftime-${message.author.id}+${message.guild.id}`);
  
    if(message.member.manageable) message.member.setNickname('');
  	//checking for mentions
  
	if (message.mentions.members.first()) {
		if (
			await db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)
		) {
			const reason = await db.get(
				`afk-${message.mentions.members.first().id}+${message.guild.id}`
			);
			let time = await db.get(
				`aftime-${message.mentions.members.first().id}+${message.guild.id}`
			);
			time = Date.now() - time;
			return message.reply(
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
});
