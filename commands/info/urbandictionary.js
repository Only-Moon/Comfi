const urban = require('relevant-urban');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "urbandictionary",
    description: "Give information about urban words",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Word to Search',
            name: 'word',
            required: true,
        },
    ],
    userperm: [""],
    botperm: ["SEND_MESSAGES"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

        let image = "http://cdn.marketplaceimages.windowsphone.com/v8/images/5c942bfe-6c90-45b0-8cd7-1f2129c6e319?imageType=ws_icon_medium";
        try {
            let res = await urban(args.join(' '))
                if (!res) return interaction.editReply("No results found for this topic, sorry!");
                let { word, urbanURL, definition, example, thumbsUp, thumbsDown, author } = res;

                let embed = new MessageEmbed()
                    .setColor(bot.color)
                    .setAuthor(`Word - ${word}`)
                    .setThumbnail(image)
                    .setDescription(`**Defintion:**\n*${definition || "No definition"}*\n\n**Example:**\n*${example || "No Example"}*`)
                    .addField('**Rating:**', `**\`Upvotes: ${thumbsUp} | Downvotes: ${thumbsDown}\`**`)
                    .addField("**Link**",  `[link to ${word}](${urbanURL})`)
                    .addField("**Author:**", `${author || "unknown"}`)
                    .setTimestamp()

                interaction.editReply({embeds: [ embed ]})
            
        } catch (e) {
            return interaction.editReply(`Error Occured - [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord) `) 
        }
    }
}
