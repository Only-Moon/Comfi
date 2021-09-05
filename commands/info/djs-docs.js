const { CommandInteraction } = require("discord.js")
const axios = require('axios');
module.exports = {
    name: "djsdocs",
      description: 'Search Djs Docs',

    options: [
        {
            name: 'query',
            type: 'STRING',
            description: 'Your query',
            required: true
        }
    ],
    /**
     *
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
        const query = interaction.options.getString("query")
        if (!query) return interaction.followUp("Please specify a query!");
        const url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
          query
        )}`;
      
          axios
            .get(url)
            .then((embed) => {
              const { data } = embed
      
              if (data && !data.error) {
                interaction.followUp({ embeds : [data] })
              } else {
                interaction.followUp('Could not find that documentation')
              }
            })
            .catch((err) => {
              console.error(err)
            })
        }}
