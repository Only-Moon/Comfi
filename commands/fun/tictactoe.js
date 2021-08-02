const simplydjs = require('simply-djs');

module.exports = {
    config: {
        name: 'tictactoe',
        aliases: ['ttt', 'tictac'],
        category: 'fun',
        usage: '[name | nickname | mention | ID]',
        description: 'Play A Game Of TicTacToe With Another User',
    },
    run: async (bot, message, args, ops) => {
        simplydjs.tictactoe(message)
    }
}