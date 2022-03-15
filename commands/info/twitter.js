/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const twitter = require('twitter-api.js');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "twitter",
    description: "Shows info about a twitter user",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Twitter username to search',
            name: 'username',
            required: true,
        },
    ],
  directory: "info",
    userperm: [""],
    botperm: ["SEND_MESSAGES"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
		let user = interaction.options.getString("username ")

		try {
			const body = await twitter.users(user);
			const tweet = new MessageEmbed()
				.setColor(bot.color)
				.setAuthor({ 
name: 					`@${body.screen_name.toLowerCase()}`,
					iconURL: body.verified
						? 'https://emoji.gg/assets/emoji/6817_Discord_Verified.png'
						: null
                   })
				.setDescription(
				` ${body.description}
      \`•\` Followers: **${body.followers_count.toLocaleString()}**
      \`•\` Following: **${body.friends_count.toLocaleString()}**
      \`•\` Tweets: **${body.statuses_count.toLocaleString()}**
      \`•\` Account Created At: ${body.created_at}`
				)
				.setFooter({
					text: `Twitter ID: ${body.id}`,
iconURL:					'https://abs.twimg.com/favicons/twitter.ico'
                   })
				.setThumbnail(body.profile_image_url_https.replace('_normal', ''))
				.setImage(body.profile_banner_url);
			await interaction.editReply({embeds: [ tweet ]});
		} catch (e) {
			if (e.status === 403)
				return interaction.editReply(
					'This user is either in private mode or deleted account'
				);
			else if (e.status === 404) return interaction.editReply('Not Found');
			else return interaction.editReply(`Unknown error: \`${e.message} - [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord) \``);
		}
	}
};
