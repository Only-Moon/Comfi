const { db } = require('../../Database.js');
const { MessageEmbed } = require('discord.js');

module.exports = {
	config: {
		name: 'setafk',
		aliases: ['afk'],
		description: 'Sets your afk in the server',
		usage: 'setafk <reason>',
		category: 'utility'
	},
	run: async (bot, message, args) => {
    if (await db.has(`afk-${message.author.id}+${message.guild.id}`)) return
    
		const content = args.join(' ') || 'No Reason';
		await db.set(`afk-${message.author.id}+${message.guild.id}`, content);
		await db.set(`aftime-${message.author.id}+${message.guild.id}`, Date.now());
		const embed = new MessageEmbed()
			.setDescription(`You have been set to afk\n**Reason :** ${content}`)
			.setColor('GREEN')
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dynamic: true })
			)
    .setFooter("Use rafk command or type a message to remove your AFK");

    if(message.member.manageable) message.member.setNickname("[AFK] " + message.member.displayName)
		message.channel.send({ embeds: [ embed ]});
	}
};