const simplydjs = require('simply-djs');
const bot = require('../../index');
let { Database } = require('quickmongo')
let db = new Database(process.env.Mongoose)
const guilds = require("../../models/guild")

bot.on('interactionCreate', async (interaction, args) => {

if (interaction.isButton()) {
  
// Suggestions
simplydjs.suggestBtn(interaction, db, {   
  yesEmoji: `${bot.tick}`,
  yesColor: 'SECONDARY',
  noEmoji: `${bot.crosss}`, 
  noColor: 'SECONDARY',
  denyEmbColor: '#ED7A7A',
  agreeEmbColor: '#6EE57F',
  })

 // Giveaway
simplydjs.clickBtn(interaction, {
  db: db
})

// Ticket
const guild = await guilds.findOne({guildId: interaction.guild.id})
    if(guild.ticket) {

let support = guild.ticket_role
  if (!support) return;

let cat = guild.ticket_category
   if (!cat) return;

  simplydjs.clickBtn(interaction, {
    embedDesc: 'Support Ticket', 
    embedColor: bot.color, 
    closeColor: 'grey' || 'SECONDARY', 
    credit: false,
    closeEmoji: '775083085124468736', 
    delColor: 'grey' || 'SECONDARY',
    delEmoji: '796196175627419678',
    openColor: 'grey' || 'SECONDARY', 
    openEmoji: '855791964975530004',
    timeout: true,
    cooldownMsg: `${bot.error} Close Old Ticket First Then Open New One Again`,
    categoryID: `${cat}`,
    role: `${support}`,
    ticketname: "ticket-{tag}"                            
  }) 
    }

}
  
});