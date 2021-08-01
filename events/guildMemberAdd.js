const { MessageEmbed } = require('discord.js');
const Enmap = require('enmap');
const { LeftImage, JoinImage } = require('../../config.json');
const canvas = require('discord-canvas');
const Canvas = require('canvas');
const moment = require('moment');
const wb = require('quick.db');

module.exports.run = async (bot, guild, member) => {
	
	bot.setups = new Enmap({ name: 'setups', dataDir: './databases/setups' });
	
	if (!member.guild) return;
	//autorole -->
	bot.setups.ensure(
		member.guild.id,
		{
			roles: []
		},
		'welcome'
	);

	let roles = bot.setups.get(member.guild.id, 'welcome.roles');

	if (roles.length >= 1) {
		for (let i = 0; i < roles.length; i++) {
			try {
				let roleadd = member.guild.roles.cache.get(roles[i]);
				member.roles.add(roleadd.id);
			} catch (e) {
				console.log(e);
			}
		}
	}
	let toggle = await db.fetch(`Weltog_${member.guild.id}`);
	let togEm = await db.fetch(`Welemtog_${member.guild.id}`);

	//code -->

	if (toggle === true) {
		if (togEm === true) {
			try {
				let sChannel = await db.fetch(`Welcome_${member.guild.id}_Channel`);
				if (!sChannel) return;
				let sMessage = await db.fetch(`Welcome_${member.guild.id}_Msg`);
				if (!sMessage) sMessage = `Welcome To The Server!`;
				let clr = await db.fetch(`Welcome_${member.guild.id}_Clr`);
				let wMessage = await db.fetch(`Welcome_${member.guild.id}_Ftr`);
				let sEmd = await db.fetch(`${Current === "Welcome" ? "Welcome" : "Leave"}_${message.guild.id}_Embed`, Msg);

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
				return bot.channels.cache.get(sChannel).send(emd, `{ embed: Embed }`)
			} catch (e) {
				console.log(e);
			}
		} else {
			try {
				let Channel = await db.fetch(`Welcome_${member.guild.id}_Channel`);
				if (!Channel) return;
				let Message = await db.fetch(`Welcome_${member.guild.id}_Msg`);
				if (!Message) Message = `Welcome To The Server!`;
				let WelcomeImage = await db.fetch(`WelIm_${member.guild.id}`);

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

				let Welcomed = new canvas.Welcome();
				let Image = await Welcomed.setUsername(member.user.username)
					.setDiscriminator(member.user.discriminator)
					.setGuildName(member.guild.name)
					.setAvatar(
						member.user.displayAvatarURL({ dynamic: false, format: 'jpg' })
					)
					.setMemberCount(member.guild.memberCount)
					.setBackground(WelcomeImage || JoinImage)
					.toAttachment();

				let Attachment = new Discord.MessageAttachment(
					Image.toBuffer(),
					'Welcome.png'
				);
				return bot.channels.cache.get(Channel).send(Msg, Attachment);
			} catch (e) {
				console.log(e);
			}
		}
  console.log("error found")
	} else {
		return;
	}

if (!member.guild) return;
	let age = await wb.get(`age.${member.guild.id}`);
	let logs = await wb.get(`logs.${member.guild.id}`);
	let punishment = wb.get(`punishment.${member.guild.id}`); {
		let day = Number(age);
		let x = Date.now() - member.user.createdAt;
		let created = Math.floor(x / 86400000);

		if (day >= created) {
			member[punishment](`Alt detected - Account younger than ${day} days`);
			let channel = await bot.channels.cache.get(logs);
			let embed = new discord.MessageEmbed()
				.setTitle(`Suspicious! Account age less than ${day} days`)
				.addField(`Member Username`, member.toString())
				.addField(`Member ID`, member.id)
				.addField(
					`Account Age`,
					moment(member.user.createdAt).format('MMMM Do YYYY, h:mm:ss a')
				)
				.addField(`Punishment`, punishment)
				.setColor('#FF0000')
				.setFooter(member.guild.name, member.guild.iconURL({ dynamic: true }));
			if (channel) channel.send({ embed: embed });
		}
	}  
  
}