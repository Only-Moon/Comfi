const { MessageEmbed, Permissions } = require("discord.js");
const ms = require("ms");
const pms = require("pretty-ms");
const { db } = require('../../Database.js');

module.exports = {
	config: {
		name: 'set-chatbot-toggle',
		aliases: ['chatbot-toggle', 'ct'],
		category: "admin",
		description: 'Sets chatbot channel',
		usage: 'set-chatbot'
	},
	run: async (bot, message, args) => {
    if (!message.member.permissions.has("PERMISSIONS.FLAGS_MANAGE_CHANNELS")) return message.channel.send("You Don't Have Enough Permission To Execute This Command - Manage Channels");

let option = args[0];
		let options = ['toggle', 'channel', 'show', 'disable'];
		if (!option)
			return message.channel.send(
				`:x: | The option argument must be one of:\n **${options.join(', ')}**`
			);
		function check(opt) {
			return options.includes(opt);
		}
		if (!check(option.toLowerCase())) {
			return message.channel.send(':x: | **The provided option is invalid**');
		}
		switch (option.toLowerCase()) {
			case 'toggle':
				const punishment = args[1];
				const punishments = ['true', 'false'];
				if (!punishment)
					return message.channel.send('Please state whether you want to turn it on or turn off');
				if (!punishments.includes(punishment))
					return message.channel.send(
						`The **toggle** argument must be one of these:\n${punishments
							.map(x => `**${x}**`)
							.join(', ')}`
					);
				await db.set(`chattgl_${message.guild.id}`, punishment);
				return message.channel.send(
					`The Chatbot for **${
						message.guild.name
					}** has been set to: **${punishment}**`
				);
				break;
			case 'channel':
				const channel = message.mentions.channels.first();
				if (!channel)
					return message.channel.send(':x: | **Specify the channel**');
				await db.set(`chatbt_${message.guild.id}`, channel.id);
				return message.channel.send(
					'**The chatbot channel has been set to** ' + channel.toString()
				);
				break;
			case 'show':
				let chnnl = await db.get(`chatbt_${message.guild.id}`) || 'None';
				let toggle = await db.get(`chattgl_${message.guild.id}`) || 'None';
				const humanizeDuration = require('humanize-duration');
				let embed = new MessageEmbed()
					.setTitle('Chatbot configuration')
					.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL({ dynamic: true })
					)
					.addField(`Toggle`, toggle)
					.addField(
						`Chatbot Channel`, `${chnnl !== 'None' ? `<#${chnnl}>` : 'None'}`)
					.setColor('#F4B3CA')
					.setFooter(
						message.guild.name,
						message.guild.iconURL({ dynamic: true })
					);
				return message.channel.send({ embeds: [embed] });
				break;
				case 'disable':
				  check = await db.get(`chatbt_${message.guild.id}`) && await db.get(`chattgl_${message.guild.id}`)
				   
				if(!check) {
				 return message.channel.send("Please set the required fields first or i cant disable it!!");
				} else {
			
            await db.delete(`chatbt_${message.guild.id}`)
await db.delete(`chattgl_${message.guild.id}`);
			return message.channel.send("Disabled the Chatbot System in the server :)");
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
};