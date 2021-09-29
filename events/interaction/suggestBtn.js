const simplydjs = require('simply-djs');
const bot = require('../../index');
let { Database } = require('quickmongo')
let db = new Database(process.env.Mongoose)

bot.on('interactionCreate', async (interaction) => {

simplydjs.suggestBtn(interaction, db, {   
  yesEmoji: `${bot.tick}`, // default: ☑️ 
  yesColor: '', // default: green 
  noEmoji: `${bot.crosss}`, // default: X 
  noColor: '', // default: red 
  denyEmbColor: '#ED7A7A', // default: RED 
  agreeEmbColor: '#6EE57F', // default: GREEN 
  })
});