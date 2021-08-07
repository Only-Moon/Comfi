const simplydjs = require('simply-djs-v13');

module.exports = {
	config: {
		name: 'calculate',
		aliases: ['calc', 'calculator'],
		category: 'utility',
		description: "Shows Calculated Answers Of User's Query",
		usage: 'calc'
	},
	run: async (bot, message, args) => {
		 simplydjs.calculator(message, { embedColor: '#F4B3CA', //default: #075FFF
		})
	}}


