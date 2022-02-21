const axios = require('axios');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "sauce",
    description: "Search anime sauce from an Image",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'the image to trace anime',
            name: 'image',
            required: true,
        },
    ],
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
    try {
const image = interaction.options.getString("image")
      
        if (!image) return interaction.editReply("no image provided")
        const traceDetails = await axios(
            `https://api.trace.moe/search?url=${encodeURIComponent(image)}`
          )
            .then((res) => res.data)
            .catch((err) => {
                interaction.editReply(`${bot.error} • Unable to fetch the image`)
            })
            if (!traceDetails?.result.length)         return await  bot.errorEmbed(bot, interaction, `No result found`)
            const animeResult = traceDetails.result[0];
            const animeDetails = await axios
              .post(`https://graphql.anilist.co`, {
                query: `query ($id: Int) {
                Media(id: $id, type: ANIME) {
                  title {
                    english
                  }
                  coverImage {
                    large
                    color
                  }
                  status
                  episodes
                  description
                  bannerImage
                }
              }`,
                variables: {id: animeResult.anilist},
              })
              .then((res) => (res.data ? res.data.data.Media : null))
              .catch(async (err) => {
                        return await  bot.errorEmbed(bot, interaction, `Unable to trace this image`)
              })
              const Embed = new MessageEmbed()
              .setTitle(`${animeDetails.title.english} | Founded`)
              .setDescription(        animeDetails.description.substring(0, 200) +
              ` **[[Read More](https://anilist.co/anime/${animeResult.anilist})]**`)
              .addField(`Traced Image/Video`, `EP. ${animeResult.episode} [Video Clip](${animeResult.video}) | [Image](${animeResult.image})`, true)
              .addField(`Status`, `${animeDetails.episodes} Episodes | ${animeDetails.status}`, true)
              .setImage(animeDetails.bannerImage)
              .setColor(animeDetails.coverImage.color
                ? parseInt(animeDetails.coverImage.color.replace('#', '0x'))
                : bot.color)
              await interaction.editReply({embeds:[Embed]})

        }catch (e) {
			let emed = new MessageEmbed()
				.setTitle(`${bot.error} • Error Occured`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
				.setColor(bot.color)

			bot.sendhook(null, {
				channel: bot.err_chnl,
				embed: emed
			})

			interaction.followUp({
				embeds: [
					{
						description: `${
							bot.error
						} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
						color: bot.color
					}
				]
			})
		}
    }


}