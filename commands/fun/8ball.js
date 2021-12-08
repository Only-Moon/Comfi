const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const answers = [
    'Maybe.',
    'Certainly not.',
    'I hope so.',
    'Not in your wildest dreams.',
    'There is a good chance.',
    'Quite likely.',
    'I think so.',
    'I hope not.',
    'I hope so.',
    'Never!',
    'Fuhgeddaboudit.',
    'Ahaha! Really?!?',
    'Pfft.',
    'Sorry, bucko.',
    'Hell, yes.',
    'Hell to the no.',
    'The future is bleak.',
    'The future is uncertain.',
    'I would rather not say.',
    'Who cares?',
    'Possibly.',
    'Never, ever, ever.',
    'There is a small chance.',
    'Yes!'
];
module.exports = {
    name: '8ball',
    description: 'You ask and i answer',
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Your question',
            name: 'question',
            required: true,
        },
    ],
    userperm: [""],
    botperm: [""],
    /** 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (bot, interaction, args) => {
        const member = interaction.guild.members.cache.get(args[0]) || interaction.member;

        let yq = args.join(' ')
        let q = args.join(' ')
        if (!q) return 
        else {
            const embed = new MessageEmbed()
                .setAuthor(`${member.user.tag} Asked me`, member.user.avatarURL({ dynamic: true }))
                .setDescription(`**Question:** \n ${yq} \n**My Answer:** \n ${answers[Math.floor(Math.random() * answers.length)]}`)
                .setColor(bot.color)
            interaction.followUp({ embeds: [embed] }).catch((e) => {
        bot.sendhook(
          `Error Occured \n ${e.stack}`
        ), {
          channel: bot.err_chnl
        }
      });
        }
    }
}
