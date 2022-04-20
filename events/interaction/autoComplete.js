/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const bot = require("../../index")
const fetch = require("node-fetch")

bot.on("interactionCreate", async (interaction) => {

if (interaction.isAutocomplete()) {

		const userInput = interaction.options.getFocused().toString();



		switch (interaction.commandName) {

			case 'npm':

				const text = interaction.options.getString('npm') // This takes the string value from the slash option in the npm command

				let url = await fetch(`https://api.npms.io/v2/search?q=${text}`).then(response => response.json());



				if (!text) {

					return interaction.respond([{

						name: 'Type the name of an npm package for more options to show!',

						value: userInput

					}])

				} else {

					const filtered = url.results.filter(x =>

						x.package.name.includes(text)

					)



					await interaction.respond(

						filtered.map(choice => ({

							name: choice.package.name,

							value: choice.package.name

						})).slice(0, 25) // This is done due to discord only allowing 25 choices with autocomplete

					).catch(err => {

						console.log(err.message)

					})



				}

		}

          }

})