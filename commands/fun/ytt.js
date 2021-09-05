const { CommandInteraction } = require("discord.js");

module.exports = {
    name: "activities",
    description: "Discord Activities in a Voice Channel",
    ownerOnly: false,
    options: [
        {
            name: 'channel',
            description: 'Voice Channel To start the activity in!',
            required: true,
            type: 'CHANNEL',

        },
        {
            name: 'activity',
            description: 'Activity To start',
            required: true,
            type: 'STRING',
            choices: [
                {
                name: 'Youtube Together',
                value: 'youtube',
                },
                {
                    name: 'Poker Night',
                    value: 'poker',
                },
                {
                    name: 'Chess in the Park',
                    value: 'chess',
                },
                {
                    name: 'Fishing.io',
                    value: 'fishing',
                },
                {
                    name: 'betrayal.io',
                    value: 'betrayal',
                },

            ]
        },
    ],
    userperm: [""],
    botperm: [""],

run: async (bot, interaction, args) => {
        const [channel, message] = args;
        
       const channelObject = interaction.guild.channels.cache.get(channel);
       if (channelObject.type !== 'GUILD_VOICE') return interaction.followUp({ content: 'Please select a voice channel also if you are on mobile it won\'t work!'})
   
		bot.discordTogether.createTogetherCode(channel, message).then(async invite => {
    			return interaction.followUp({ content: `[Click Here To Join The Activity In](${invite.code}) <#${channel}>\n**ACTIVITY: ${message.toLocaleUpperCase()}** `});
		});
    
    },
};