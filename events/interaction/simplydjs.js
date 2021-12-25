const simplydjs = require('simply-djs')
const bot = require('../../index')
let { Database } = require('quickmongo')
let db = new Database(process.env.Mongoose)
const guilds = require('../../models/guild')

bot.on('interactionCreate', async (interaction, args) => {
	if (interaction.isButton()) {
		// Suggestions
		simplydjs.suggestBtn(interaction, db, {
			yesEmoji: `${bot.tick}`,
			yesColor: 'SECONDARY',
			noEmoji: `${bot.crosss}`,
			noColor: 'SECONDARY',
			denyEmbColor: '#ED7A7A',
			agreeEmbColor: '#6EE57F'
		})

		// Ticket
		const guild = await guilds.findOne({ guildId: interaction.guild.id })
		if (guild.ticket) {
			let support = guild.ticket_role
			if (!support) return

			let cat = guild.ticket_category
			if (!cat) return

			let log = guild.mod_channel
			if (!log) return

			simplydjs.clickBtn(interaction, {
				embedDesc: 'Support Ticket',
				embedColor: bot.color,
				closeColor: 'SECONDARY',
				credit: false,
				closeEmoji: '775083085124468736',
				delColor: 'SECONDARY',
				delEmoji: '796196175627419678',
				openColor: 'SECONDARY',
				openEmoji: '855791964975530004',
				trEmoji: '905055261021061150',
				trColor: 'SECONDARY',
				timeout: false,
				cooldownMsg: `${
					bot.error
				} Close Old Ticket First Then Open New One Again`,
				categoryID: `${cat}`,
				role: `${support}`,
				pingRole: `${support}`,
				ticketname: 'ticket-{tag}',
				logChannel: `${log}`,

				db: db
			})
		}
	}
})
