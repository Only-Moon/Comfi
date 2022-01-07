const bot = require('../../index')
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

bot.on('interactionCreate', async (interaction, args) => {

	if (interaction.isAutocomplete()) {
		if (interaction.commandName === 'translate') {
			const value = interaction.options.getFocused();
			const choices = [
				{
					name: 'Danish',
					value: 'da'
				},
				{
					name: 'English',
					value: 'en'
				},
				{
					name: 'Dutch',
					value: 'nl'
				},
				{
					name: 'Finnish',
					value: 'fi'
				},
				{
					name: 'French',
					value: 'fr'
				},
				{
					name: 'French (Canada)',
					value: 'fr-CA'
				},
				{
					name: 'German',
					value: 'de'
				},
				{
					name: 'Italian',
					value: 'it'
				},
				{
					name: 'Japanese',
					value: 'ja'
				},
				{
					name: 'Korean',
					value: 'ko'
				},
        {
          name: "No",
          value: "no"
        },
				{
					name: 'Polish',
					value: 'pl'
				},
				{
					name: 'Portuguese (Brazil)',
					value: 'pt'
				},
				{
					name: 'Portuguese (Portugal)',
					value: 'pt-PT'
				},
				{
					name: 'Russian',
					value: 'ru'
				},
				{
					name: 'Spanish',
					value: 'es'
				},
				{
					name: 'Swedish',
					value: 'sv'
				},
				{
					name: 'Turkish',
					value: 'tr'
				},
				{
					name: 'Chinese Simplified',
					value: 'zh-Hant'
				},
				{
					name: 'Chinese Traditional',
					value: 'zh-Hans'
				}, 
        {
          name: "Hindi",
          value: "hi"
        },
        {
          name: "Punjabi",
          value: "pa"
        },
        {
          name: "Urdu",
          value: "ur"
        },
        {
          name: "Tamil",
          value: "ta"
        },
        {
          name: "Telegu",
          value: "te"
        },
        {
          name: "Arabic",
          value: "ar"
        },
        {
          name: "Bangla",
          value: "bn"
          }
			];

			const filtered = choices
				.filter(choice => choice.name.startsWith(value))
				.slice(0, 24)
				.sort();
      
			const response = await interaction.respond(
				filtered.map(choice => ({ name: choice.name, value: choice.value }))
			);
		} else return;
  }
  
})