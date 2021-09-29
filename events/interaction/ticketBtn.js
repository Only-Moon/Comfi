const bot = require("../../index");
const simplydjs = require('simply-djs');
const guilds = require('../../models/guild');

bot.on('interactionCreate', async (interaction) => {

    const guild = await guilds.findOne({guildId: interaction.guild.id})
    if(guild.ticket) {

let support = guild.ticket_role
  if (!support) return;

let cat = guild.ticket_category
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
    categoryID: `${cat}`,
    role: `${support}`                               
  }) 
    }
})