const bot = require('../../index')
const {
	MessageEmbed,
	MessageButton,
	MessageActionRow,
	Permissions
} = require('discord.js')
const guilds = require(`../../models/guild`)

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on('guildCreate', async guild => {
	await guilds.create({ guildId: guild.id })

	{
		let ch = guild.channels.cache.find(
			channel =>
				channel.type === 'GUILD_TEXT' &&
				channel.permissionsFor(guild.me).has('SEND_MESSAGES')
		)

		let button = new MessageButton()
			.setStyle('LINK')
			.setLabel('Support')
			.setURL(`https://discord.gg/remYPHCVgW`)

		const row = new MessageActionRow().addComponents(button)

		let msg = new MessageEmbed()
			.setTitle(
				'<a:pinkheart_cs:883033001599074364> Thanks for adding me! <a:pinkheart_cs:883033001599074364>'
			)
			.setColor(bot.color)
			.setDescription(
				`Hey, thanks for adding me to ${
					guild.name
				} :-<a:wing_cs:883032991293653062> \n My Prefix Is **/** \n\n To get started type **/help** Or **/help ping**`
			)
			.setFooter({text: 'Comfi™ v1.0.0'})

    if (ch) {
		ch.send({
			embeds: [msg],
			components: [row]
		})
  }  
	}
	{
		const channelId = '881789380073783301'

		const Channel = guild.channels.cache
			.find(
				ch =>
					ch.type == 'GUILD_TEXT' &&
					ch.permissionsFor(ch.guild.me).has('CREATE_INSTANT_INVITE')
			)
			.createInvite({
				maxAge: 0,
				maxUses: 0
			})
			.then(async (invite) => {
				const channel = bot.channels.cache.get(channelId)
				if (!channel) return

    let theowner = "Owner Not Found !!";
    await guild.fetchOwner().then(({ user }) => { theowner = user; }).catch(() => {})
        
				const embed = new MessageEmbed()
					.setTitle('Someone invited me!')
					.setDescription(
						`**Guild Name:** ${guild.name} (${guild.id})\n **Owner Info:** \`\`\`${theowner ? `${theowner.tag} (${theowner.id})` : `${theowner} (${guild.ownerId})`}\`\`\` \n**Members:** ${
							guild.memberCount
						}`
					)
					.setTimestamp()
					.setColor(bot.color)
					.setFooter({text: `I'm in ${bot.guilds.cache.size} Guilds Now!`})

				const button = new MessageActionRow().addComponents(
					new MessageButton()
						.setLabel('Join that Guild')
						.setStyle('LINK')
						.setURL(invite.url)
				)

        if (channel) {
				channel.send({
					embeds: [embed],
					components: [button]
				})
      }
			})
	}
})
