const { glob } = require('glob')
const { promisify } = require('util')

const globPromise = promisify(glob)

module.exports = async bot => {
	// Events
	const eventFiles = await globPromise(`${process.cwd()}/events/*/*.js`)
	eventFiles.map(value => require(value))

	// Slash

	const slashCommands = await globPromise(`${process.cwd()}/commands/*/*.js`)
	let arrayOfSlashCommands = []

	slashCommands.map(value => {
		const file = require(value)
		if (!file?.name) return
		bot.slashCommands.set(file.name, file)

		if (['MESSAGE', 'USER'].includes(file.type)) delete file.description
		arrayOfSlashCommands.push(file)
	})

	bot.on('ready', async () => {
		let dev = process.env['DEV_MODE']

		if (dev === true.toString()) {
			bot.guilds.cache.forEach(g => {
				g.commands.set(arrayOfSlashCommands)
			})

			bot.logger.ready(`Loaded Guild commands...`)
		} else if (dev === false.toString()) {
			await bot.application.commands.set(arrayOfSlashCommands)

			bot.logger.ready(`Loaded Global Commands...`)
		}
	})
}
