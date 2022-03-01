const { CommandInteraction, MessageEmbed } = require("discord.js");
const purge = require('discord-purger')

module.exports = {
    name: "purge",
    description: 'Purge messages',
    ownerOnly: false,
    ephemeral: true,
    options: [
        {
            name: "messages",
            description: "Purge messages in this channel.",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                }
            ]
        },
        {
            name: "bot-messages",
            description: "Purge all messages sent by bots in this channel",
            type: `SUB_COMMAND`
        },
        {
            name: "links",
            description: "Purge messages which contain links",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                }
            ]
        },
        {
            name: "emojis",
            description: "Purge messages which contain emojis",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                }
            ]
        },
        {
            name: "attachments",
            description: "Purge messages which contain attachments",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                }
            ]
        },
        {
            name: "user",
            description: "Purge messages of a specific user",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                },
                {
                    name: "user",
                    type: `USER`,
                    description: "The user whose messages you want to purge",
                    required: true
                }
            ]
        },
        {
            name: "match",
            description: "Purge messages which match specified content in the channel",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                },
                {
                    name: "text",
                    type: `STRING`,
                    description: "The message content to match with.",
                    required: true
                }
            ]
        },
        {
            name: "includes",
            description: "Purge messages which includes specified content in this channel",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                },
                {
                    name: "text",
                    type: `STRING`,
                    description: "The text to search",
                    required: true
                }
            ]
        },
        {
            name: "starts-with",
            description: "Purge all messages which starts with specified text in this channel",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                },
                {
                    name: "text",
                    type: `STRING`,
                    description: "The text with which the messages start with.",
                    required: true
                }
            ]
        },
        {
            name: "ends-with",
            description: "Purge all messages which ends with something",
            type: `SUB_COMMAND`,
            options: [
                {
                    name: "number",
                    type: `INTEGER`,
                    description: "Number of messages to purge",
                    required: true
                },
                {
                    name: "text",
                    type: `STRING`,
                    description: "The text with which the messages end with",
                    required: true
                }
            ]
        },
    ],
    botperm: "MANAGE_MESSAGES",
    userperm: "MANAGE_MESSAGES",
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
run: async (bot, interaction, args) => {

try {

const purger = new purge({
    handle: true,
    rejectEmoji: bot.error,
    acceptEmoji: bot.tick,
});

        const s = interaction.options.getSubcommand();
  
        const messages = interaction.options.getInteger("number"),
            user = interaction.options.getUser("user"),
            string = interaction.options.getString("text");

if (s !== 'bot-messages' && messages <= 1) return await  bot.errorEmbed(bot, interaction, `You cant purge less than one message`)

            if (messages > 99)         return await  bot.errorEmbed(bot, interaction, `You cannot purge more than 100 messages at once.`)

        let sus;
        if (s === 'messages') sus = 'messages';
        else if (s === 'links') sus = 'link-messages';
        else if (s === 'bot-messages') sus = 'bot-messages';
        else if (s === 'emojis') sus = 'emoji-messages';
        else if (s === 'attachments') sus = 'attachment-messages';
        else if (s === 'user') sus = 'user-messages';
        else if (s === 'match') sus = 'messages-equal';
        else if (s === 'includes') sus = 'messages-includes';
        else if (s === 'starts-with') sus = 'messages-starts';
        else if (s === 'ends-with') sus = 'messages-ends';
        const num = messages - 1

        await interaction.editReply({content: `Purging ...`, fetchReply:  true}).then((msg) => {
  setTimeout(() => { if(msg.deletable) msg.delete() }, bot.ms('5s'))
  });

  
const pur = await purger.purge(sus, interaction, interaction.channel, num, user || string)
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
  
    },
};
