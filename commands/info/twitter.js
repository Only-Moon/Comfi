const request = require('node-superfetch');
const { stripIndents } = require('common-tags');
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
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
		let user = args[0];

		try {
			const body = await twitter.users(user);
			const tweet = new MessageEmbed()
				.setColor('BLUE')
				.setAuthor(
					`@${body.screen_name.toLowerCase()}`,
					body.verified
						? 'https://emoji.gg/assets/emoji/6817_Discord_Verified.png'
						: null
				)
				.setDescription(
					stripIndents` ${body.description}
      \`•\` Followers: **${body.followers_count.toLocaleString()}**
      \`•\` Following: **${body.friends_count.toLocaleString()}**
      \`•\` Tweets: **${body.statuses_count.toLocaleString()}**
      \`•\` Account Created At: ${body.created_at}`
				)
				.setFooter(
					`Twitter ID: ${body.id}`,
					'https://abs.twimg.com/favicons/twitter.ico'
				)
				.setThumbnail(body.profile_image_url_https.replace('_normal', ''))
				.setImage(body.profile_banner_url);
			interaction.editReply({embeds: [ tweet ]});
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
