const chalk = require('chalk')
const { MessageSelectMenu, MessageActionRow } = require('discord.js')

/* MENU CREATOR */

/**
 * @param {Array} array - The array of options (rows to select) for the select menu
 * @returns MessageSelectMenu
 */

const create_mh = array => {
	if (!array)
		throw new Error(
			chalk.red.bold(
				'The options were not provided! Make sure you provide all the options!'
			)
		)

	if (array.length < 0)
		throw new Error(
			chalk.red.bold(`The array has to have atleast one thing to select!`)
		)

	let select_menu
	let id = 'help-menus'
	let menus = []

	const emo = {
		//admin: "<a:loli_2_cs:883017896245211166>",
		anime: '<a:snowman_cs:883017868944502804>',
		emoji: '<a:apple_cs:883033005172605020>',
		fun: '<a:shootingstaw_cs:883017879065354290>',
		info: '<a:stars_cs:883033007836000308>',
		levels: '<a:bunny_cs:883033003574579260>',
		mod: '<a:pinkheart_cs:883033001599074364>',
		//music: "<a:music_cs:883032989901156422>",
		roles: '<a:cake2_cs:883017860488765460>',
		setup: '<a:starburst_cs:883017855187157003>',
		utility: '<a:ghost_cs:883017884014637066>'
	}

	array.forEach(cca => {
		let name = cca
		let sName = `${name.toUpperCase()}`
		let emoji = `${emo[name.toLowerCase()]}`
		let tName = name.charAt(0).toUpperCase() + name.slice(1)
		let fName = name.toUpperCase()

		return menus.push({
			label: sName,
			description: `${tName} commands!`,
			value: fName,
			emoji: emoji
		})
	})

	let chicken = new MessageSelectMenu()
		.setCustomId(id)
		.setPlaceholder('Choose the command category')
		.addOptions(menus)

	select_menu = new MessageActionRow().addComponents(chicken) //console.log(select_menu.components[0].options)

	return {
		smenu: [select_menu],
		sid: id
	}
}

module.exports = create_mh
