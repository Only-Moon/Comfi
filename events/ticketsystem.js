const bot = require("../index");
const simplydjs = require('simply-djs');
const { db } = require('../Database.js');

bot.on('interactionCreate', async (interaction) => {

let support = await db.get(`supportrole_${interaction.guild.id}`); if (!support) return;

let cat = await db.get(`tik_cat${interaction.guild.id}`)

   if (!cat) return;

  simplydjs.clickBtn(interaction, {
    embedDesc: '', 
    embedColor: '#F8B6D4', // default: #075FFF 
    closeColor: 'red', //default: blurple 
    credit: false,
    closeEmoji: '775083085124468736', // default: 🔒 
    delColor: '', // default: grey 
    delEmoji: '796196175627419678', // default: ❌
    openColor: 'grey' , // default: green 
    openEmoji: '855791964975530004', // default: 🔓 
    timeout: true, // default: true | Needs to be boolean (true/false)
    cooldownMsg: 'Close Old Ticket First Then Open New One Again',
    categoryID: '${cat}',
    role: `${support}` // Role which sees the ticket channel (like Support Role)
                                
  }) 

})