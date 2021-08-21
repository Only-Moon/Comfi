const { MessageEmbed } = require('discord.js');
const { LeftImage, JoinImage } = require('../../config.json');
const canvas = require('discord-canvas');
const Canvas = require('canvas');
const db = require("old-wio.db");
const wb = require("quick.db");
const moment = require("moment");
const Discord = require('discord.js')
  
module.exports.run = async (bot, member) => {

  let guild = member.guild;

	
	let toggle = await db.fetch(`leavtog_${member.guild.id}`);
	let togEm = await db.fetch(`leavemtog_${member.guild.id}`);

	if (toggle === true) {
		if (togEm === true) {
			try {
				let sChannel = await db.fetch(`Leave_${member.guild.id}_Channel`);
				if (!sChannel) return;
				let sMessage = await db.fetch(`Leave_${member.guild.id}_Msg`);
				if (!sMessage)
					sMessage = `${member.user.username} Has Left The Server!`;
					let clr = await db.fetch(`Leave_${member.guild.id}_Clr`);
					let wMessage = await db.fetch(`Leave_${member.guild.id}_Ftr`);
				 let sEmd = await db.fetch(`Leave_${member.guild.id}_Embed`);

				if (member.user.username.length > 25)
					member.user.username = member.user.username.slice(0, 25) + '...';
				if (member.guild.name.length > 15)
					member.guild.name = member.guild.name.slice(0, 15) + '...';

				let sMsg = sMessage
					.replace(/{user}/g, `${member}`)
					.replace(/{user_tag}/g, `${member.user.tag}`)
					.replace(/{user_name}/g, `${member.user.username}`)
					.replace(/{user_id}/g, `${member.id}`)
					.replace(/{server_name}/g, `${member.guild.name}`)
					.replace(/{server_id}/g, `${member.guild.id}`)
					.replace(/{membercount}/g, `${member.guild.memberCount}`)
					.replace(/{guild}/g, `${member.guild.name}`)
					.replace(
						/{user_createdAgo}/g,
						`${moment(member.user.createdTimestamp).fromNow()}`
					)
					.replace(
						/{user_createdAt}/g,
						`${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`
					);


         let wMsg = wMessage
					.replace(/{membercount}/g, `${member.guild.memberCount}`)
					.replace(/{guild}/g, `${member.guild.name}`)
					.replace(
						/{user_createdAgo}/g,
						`${moment(member.user.createdTimestamp).fromNow()}`
					)
					.replace(
						/{user_createdAt}/g,
						`${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`
					);

       let emd = sEmd
					.replace(/{user}/g, `${member}`)
					.replace(/{user_tag}/g, `${member.user.tag}`)
					.replace(/{user_name}/g, `${member.user.username}`)
					.replace(/{user_id}/g, `${member.id}`)
					.replace(/{server_name}/g, `${member.guild.name}`)
					.replace(/{server_id}/g, `${member.guild.id}`)
					.replace(/{membercount}/g, `${member.guild.memberCount}`)
					.replace(/{guild}/g, `${member.guild.name}`)

				const Embed = new MessageEmbed()
					.setDescription(sMsg)
					.setFooter(wMsg)
					.setThumbnail(`${member.user.displayAvatarURL()}`)
					.setColor(clr);
				return bot.channels.cache.get(sChannel).send({content: [emd], embeds: [Embed] });
			} catch (e) {
				console.log(e);
			}
		} else {
			try {
				let Channel = await db.fetch(`Leave_${member.guild.id}_Channel`);
				if (!Channel) return;
				let Message = await db.fetch(`Leave_${member.guild.id}_Msg`);
				if (!Message) Message = `${member.user.username} Has Left The Server!`;
				let LeaveImage = await db.fetch(`Leaveim_${member.guild.id}`);

				if (member.user.username.length > 25)
					member.user.username = member.user.username.slice(0, 25) + '...';
				if (member.guild.name.length > 15)
					member.guild.name = member.guild.name.slice(0, 15) + '...';

				let Msg = Message.replace(/{user}/g, `${member}`)
					.replace(/{user_tag}/g, `${member.user.tag}`)
					.replace(/{user_name}/g, `${member.user.username}`)
					.replace(/{user_id}/g, `${member.id}`)
					.replace(/{server_name}/g, `${member.guild.name}`)
					.replace(/{server_id}/g, `${member.guild.id}`)
					.replace(/{membercount}/g, `${member.guild.memberCount}`)
					.replace(/{guild}/g, `${member.guild.name}`)
					.replace(
						/{user_createdAgo}/g,
						`${moment(member.user.createdTimestamp).fromNow()}`
					)
					.replace(
						/{user_createdAt}/g,
						`${moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}`
					);

				let Leaved = new canvas.Goodbye();
				let Image = await Leaved.setUsername(member.user.username)
					.setDiscriminator(member.user.discriminator)
					.setGuildName(member.guild.name)
					.setAvatar(
						member.user.displayAvatarURL({ dynamic: false, format: 'jpg' })
					)
					.setMemberCount(member.guild.memberCount)
					.setBackground(LeaveImage || LeftImage)
					.toAttachment();

				let Attachment = new Discord.MessageAttachment(
					Image.toBuffer(),
					'leave.png'
				);
				return bot.channels.cache.get(Channel).send({ content:  [Msg], files: [Attachment]});
			} catch (e) {
				console.log(e);
			}
		}
	} else {
		return;
  console.log(`error`)
  }
}  