const { Trivia } = require('discord-gamecord');
const { CommandInteraction, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
  name: 'travia',
  description: 'Play a game of travia',
  ownerOnly: false,
  options: [
    {
      type: ApplicationCommandOptionType.String,
      description: 'the difficulty to play with (default: medium)',
      name: 'difficulty',
      required: false,
      choices: [
        { name: 'Easy', value: 'easy' },

        { name: 'Medium', value: 'medium' },

        { name: 'Hard', value: 'hard' },
      ],
    },
  ],
  directory: 'fun',
  userperm: [''],
  botperm: [''],
  /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
  run: async (bot, interaction, args) => {
    new Trivia({

      message: interaction,

      slash_command: true,

      embed: {

        title: 'Trivia',

        description: 'You have {time} seconds to respond!',

        color: bot.color,

      },

      difficulty: interaction.options.getString('difficulty') || 'medium',

      winMessage: 'Great job!, Your answer was correct! It was indeed **{answer}**',

      loseMessage: 'Your answer was Incorrect! The correct answer was **{answer}**',

      othersMessage: 'You are not allowed to use buttons for this message!',

    }).startGame();
  },
};
