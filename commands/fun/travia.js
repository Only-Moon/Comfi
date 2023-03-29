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
    {
      type: ApplicationCommandOptionType.String,
      description: 'modes to play (default: single)',
      name: "mode",
      required: false,
      choices: [
        { name: "Single", value: 'single' },

        { name: 'Multiple', value: 'multiple' },
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
    
    const Game = new Trivia({

      message: interaction,

      isSlashGame: true,

      mode: interaction.options.getString("mode") || "single",

      embed: {

        title: 'Trivia',

        description: `You have 60 seconds to respond!`,

        color: bot.color,

      },

      difficulty: interaction.options.getString('difficulty') || 'medium',

      winMessage: 'Great job!, Your answer was correct! It was indeed **{answer}**',

      loseMessage: 'Your answer was Incorrect! The correct answer was **{answer}**',

      errMessage: 'Unable to fetch questions! Please try again later',
      
      playerOnlyMessage: `Only {player} can use these buttons`

    })
      
    Game.startGame();

    Game.on("gameOver", async result => {
    
    if (result.result === "lose") {
        return await bot.successEmbed(bot, interaction, `Game Over. You ${result.result}. The correct answer was ${result.question.answer}`)
         } else {
                return await bot.successEmbed(bot, interaction, `Game Over. You ${result.result}`)
         }
    })
         
  }
}
