/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

const { CommandInteraction, EmbedBuilder, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: '8ball',
  description: 'You ask and i answer',
  ownerOnly: false,
  directory: 'fun',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      description: 'Your question',
      name: 'question',
      required: true,
    },
  ],
  userperm: [''],
  botperm: [''],
  /**
	 * @param {Message} message
	 * @param {String[]} args
	 */
  run: async (bot, interaction, args) => {
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
      'Yes!',
    ];

    try {
      const member = interaction.guild.members.members.cache.get(args[0]) || interaction.member;

      const yq = args.join(' ');
      const q = args.join(' ');
      if (!yq) {
        return;
      }
      const embed = new EmbedBuilder()
        .setAuthor({
          name: `${member.user.tag} Asked me`,
          iconURL: member.user.avatarURL({ dynamic: true }),
        })
        .setDescription(
          `**Question:** \n ${yq} \n**My Answer:** \n ${
            answers[Math.floor(Math.random() * answers.length)]
          }`,
        )
        .setColor(bot.color);
      await interaction.followUp({ embeds: [embed] }).catch(() => null);
    } catch (e) {
      await bot.senderror(interaction, e);
    }
  },
};
