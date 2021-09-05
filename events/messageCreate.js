const bot = require("../index");
const { MessageEmbed } = require('discord.js');
const { db } = require('../Database')
const simplydjs = require('simply-djs')
const moment = require('moment');
const ms = require('ms');
const pms = require('pretty-ms');
const wb = require("quick.db")
const { PREFIX } = require("../config.js");

bot.on("messageCreate", async (message) => {

 	if (message.author.bot || !message.guild || message.webhookID) return;

let disabled = new MessageEmbed()		
  .setTitle('Chatbot Error')
  .setColor('#F4B3CA')		
  .setDescription('Chat Bot is disabled by the Owner in this Server!')		
  .setFooter(`Requested by ${message.author.username}`);

  
let ch = await db.get(`chatbt_${message.guild.id}`)
  
  if (!ch || ch === undefined) return;
  
  if(message.channel.id === ch){
let toggle = await db.fetch(`chattgl_${message.guild.id}`);

	if(toggle.toString() === `true`){ 

  simplydjs.chatbot(bot, message, {
    chid: `${ch}`,
    name: 'Comfi', // default: Your bot na
    developer: `Moonbow and ImRopoxPro`,
  })
} else if(!toggle || toggle.toString() === 'false') return message.delete(), message.author.send({embeds: [ disabled ]})
}

    
	
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
    .setColor('#F4B3CA')				
    .setFooter(`Requested by ${message.author.username}`)				
    .setTimestamp();	
	
 message.channel.send({embeds: [ ping ]})                                         }

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

	let cmdx = await wb.fetch(`cmd_${message.guild.id}`);

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

if (await db.has(`afk-${message.author.id}+${message.guild.id}`)) {
		const info = await db.fetch(`afk-${message.author.id}+${message.guild.id}`);
		await db.delete(`afk-${message.author.id}+${message.guild.id}`);
		await db.delete(`aftime-${message.author.id}+${message.guild.id}`);
  
    if(message.member.manageable) message.member.setNickname('');
  	//checking for mentions
  
	if (message.mentions.members.first()) {
		if (
			await db.has(`afk-${message.mentions.members.first().id}+${message.guild.id}`)
		) {
			const reason = await db.fetch(
				`afk-${message.mentions.members.first().id}+${message.guild.id}`
			);
			let time = await db.fetch(
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
});
