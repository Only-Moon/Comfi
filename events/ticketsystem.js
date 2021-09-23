const bot = require("../index");
const simplydjs = require('simply-djs');
const { db } = require('../Database.js');

bot.on('interactionCreate', async (interaction) => {

let support = await db.get(`supportrole_${interaction.guild.id}`);
  if (!support) return;

let cat = await db.get(`tik_cat${interaction.guild.id}`)
   if (!cat) return;

  simplydjs.clickBtn(interaction, {
    embedDesc: 'Support Ticket', 
    embedColor: bot.color, 
    closeColor: 'red', 
    credit: false,
    closeEmoji: '775083085124468736', 
    delColor: '',
    delEmoji: '796196175627419678',
    openColor: 'grey' , 
    openEmoji: '855791964975530004',
    timeout: true,
    cooldownMsg: `${bot.error} Close Old Ticket First Then Open New One Again`,
    categoryID: '${cat}',
    role: `${support}`
                                
  }) 

})