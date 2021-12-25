const fetch = require('node-fetch');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "github",
    description: "Shows Information about github user",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Github username',
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
    run: async (bot, interaction, args) => {
    
        const name = args.join(' ');
		if (!name) {
			return interaction.editReply(`🚫 Please provide a valid user`);
		}

		const url = `https://api.github.com/users/${name}`;

		let response;
		try {
			response = await fetch(url).then(res => res.json());
		}
		catch (e) {
			return interaction.editReply(
        {content: `${bot.error} An error occured - [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord) ! \nError: ${e}`
        });
		}

		try {
			const embed = new MessageEmbed()
				.setColor(bot.color)
				.setTitle(`${response.login} (${response.id})`)
				.setDescription(response.bio ? response.bio : 'None')
				.addFields(
					{ name: '>> Followers', value: `\`\`\`${response.followers.toLocaleString()}\`\`\``, inline: true },
					{ name: '>> Following', value: `\`\`\`${response.following.toLocaleString()}\`\`\``, inline: true },
					{ name: '>> Repositories', value: `\`\`\`${response.public_repos.toLocaleString()}\`\`\``, inline: true },
					{ name: '>> Email', value: `\`\`\`${response.email ? response.email : 'None'}\`\`\`` },
					{ name: '>> Company', value: `\`\`\`${response.company ? response.company : 'None'}\`\`\`` },
					{ name: '>> Location', value: `\`\`\`${response.location ? response.location : 'None'}\`\`\`` },
				)
				.setURL(response.html_url)
				.setThumbnail(response.avatar_url)
        		.setTimestamp();

			interaction.editReply({embeds: [ embed ]});
		} catch (e) {
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
};