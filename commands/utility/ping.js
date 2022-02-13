const { CommandInteraction, MessageEmbed } = require('discord.js')
const moment = require("moment");
require("moment-duration-format");

module.exports = {
	name: 'ping',
	description: 'Shows Bot Ping',
	ownerOnly: false,
  directory: "utility",
	userperm: [''],
	botperm: [''],
	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {

		const embed = new MessageEmbed()
			.setColor(bot.color)
			.setDescription(`<a:p_loading1:883233236757667870> • Pinging ...`)
    let msg = await interaction.editReply({embeds: [embed], fetchReply: true})
    
		let circles = {
			green: '<a:green_fire:890138128499736636>',
			yellow: '<a:enoobies_fire:883032979746725928>',
			red: '<a:p_fire2:890138689072672788>'
		}

		setTimeout(() => {    

let ping = msg.createdTimestamp - interaction.createdTimestamp

const duration = moment.duration(bot.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
    
		const pingEmbed = new MessageEmbed()
			.setColor(bot.color)
			.setAuthor({name: 'Pong! 🏓 ', iconURL: interaction.user.avatarURL({ dynamic: true })})
			.addFields({
				name: 'Api Latency:',
				value: `${
					bot.ws.ping <= 200
						? circles.green
						: bot.ws.ping <= 400
							? circles.yellow
							: circles.red
				} ${Math.floor(bot.ws.ping)}ms`,
        inline: true
        },
        {				
          name: 'Message Latency',
				value: `${
					ping <= 200
						? circles.green
						: ping <= 400
							? circles.yellow
							: circles.red
				} ${ping}ms`,
         inline: true	        
        },
        {
          name: "Uptime",
          value: `<a:timer_CS:913470656342032395> ${duration}`,
          inline: true 
        });

    msg.edit({ embeds: [pingEmbed] }).catch(() => null)
    }, bot.ms("5s"))
	}
}
