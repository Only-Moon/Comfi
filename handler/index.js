const { glob } = require('glob')
const { promisify } = require('util')
const { ApplicationCommandType, Routes } = require('discord.js')
const { REST } = require('@discordjs/rest')
const Client = require('../models/Client')
const { platform } = require('os')

/*
 * Comfi Bot for Discord
 * Copyright (C) 2023 Xx-Mohit-xX
 * This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
 * For more information, see README.md and LICENSE
 */

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

/**
 * Function to check for windows os
 * @param value the string of diffrent file locations
 * @returns the file location in win format
 */
function load(value) {
	if (process.platform === 'win32') return require(`${process.cwd()}/${value}`)
	else return require(value)
}

/**
 * Loads all bot commands, events, and registers slash commands.
 *
 * Loads commands and events by globbing files in respective folders.
 * Registers slash commands based on files in the commands folder.
 * Handles refreshing slash commands in dev/prod environments.
 * Saves loaded commands to the database on bot ready.
 */
module.exports = async (bot) => {
	// Events
	const eventFiles = await glob(`${process.cwd()}/events/*/*.js`)
	eventFiles.map((value) => load(value))

	// Slash
	const slashCommands = await glob(`${process.cwd()}/commands/*/*.js`)
	const arrayOfSlashCommands = []
	const data = []

	/**
	 * Maps over the slashCommands array to load each command file,
	 * add the command to the bot's slashCommands map, build the
	 * arrayOfSlashCommands array with command metadata for
	 * registration, and build the data array with command names
	 * and descriptions for database storage.
	 */
	slashCommands.map((value) => {
		const file = load(value)
		if (!file?.name) return

		bot.slashCommands.set(file.name, file)

		if (
			[ApplicationCommandType.User, ApplicationCommandType.Message].includes(
				file.type
			)
		)
			delete file.description

		arrayOfSlashCommands.push({
			name: file.name,
			description: file.description,
			type: file.type ? file.type : ApplicationCommandType.ChatInput,
			options: file.options ? file.options : null,
			default_member_permissions: null
		})

		data.push({
			name: file.name,
			description: file.description,
			directory: file.directory
		})
	})

	const dev = process.env.DEV_MODE || 'false'

	/**
	 * Refreshes the bot's slash commands based on environment.
	 *
	 * In dev mode, reloads the commands for the dev guild.
	 * In prod mode, reloads the global application commands.
	 * Logs the result.
	 */
	;(async () => {
		try {
			bot.logger.cmd('Started refreshing (/) commands')

			if (dev === 'true') {
				await rest.put(
					Routes.applicationGuildCommands(
						process.env.clientID,
						'758949191497809932'
					),
					{
						body: arrayOfSlashCommands
					}
				)

				bot.logger.cmd('Successfully reloaded Guild (/) commands')
			} else if (dev === 'false') {
				await rest
					.put(Routes.applicationCommands(process.env.clientID), {
						body: arrayOfSlashCommands
					})
					.then(function () {
						bot.logger.cmd('Successfully reloaded Application (/) commands.')
					})
			}
		} catch (error) {
			console.log(error)
		}
	})()

	/**
	 * When the bot is ready:
	 * - Find the client document for this bot and check if it already has commands.
	 * - If no commands, initialize with the passed in data.
	 * - Otherwise, check if the command name already exists.
	 * - If not, push the new command data to the client document's commands array.
	 */
	bot.on('ready', async () => {
		const client = await Client.findOne({ clientId: bot.user.id })

		if (!client.commands || client.commands.length === 0) {
			client.commands.push(data)
			await client.save()
		}

		if (client.commands[0].find((cmd) => cmd?.name !== data.name)) {
			await Client.findOneAndUpdate(
				{ clientId: bot.user.id },
				{
					$push: [
						{
							commands: {
								name: data.name,
								description: data.description,
								directory: data.directory
							}
						}
					]
				}
			)
			bot.logger.cmd('Successfully reloaded application (/) commands database.')
		}
	})
}
