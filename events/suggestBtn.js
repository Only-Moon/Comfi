const simplydjs = require('simply-djs');
const { db } = require('../Database.js');
const bot = require('../index');

bot.on('interactionCreate', async (interaction) => {

simplydjs.suggestBtn(interaction, db, {   
  yesEmoji: '778611379560120320', // default: ☑️ 
  yesColor: '', // default: green 
  noEmoji: '778611410539905044', // default: X 
  noColor: '', // default: red 
  denyEmbColor: '#ED7A7A', // default: RED 
  agreeEmbColor: '#6EE57F', // default: GREEN 
  })
});