const { MessageButton, MessageActionRow } = require('discord.js');
const Discord = require('discord.js');
const simplydjs = require('simply-djs');
const { db } = require('../Database.js');

module.exports.run = async (message, button, bot) => {

  
let cat = await db.get(`category_${button.guild.id}`)

  if (!cat) return console.log('no val in cat');
    
let support = await db.get(`supportrole_${button.guild.id}`);
  
  if (!support) return console.log('no val in db');

  simplydjs.clickBtn(button, {
    embedDesc: '', 
    embedColor: '#F8B6D4', // default: #075FFF 
    closeColor: 'red', //default: blurple 
    credit: false,
    closeEmoji: '', // default: 🔒 
    delColor: '', // default: grey 
    delEmoji: '', // default: ❌
    openColor: '' , // default: green 
    openEmoji: '', // default: 🔓 
    timeout: true, // default: true | Needs to be boolean (true/false)
    cooldownMsg: 'Close Old Ticket First Then Open New One Again',
    categoryID: '816148398751088700',
    role: '872745873417863170' // Role which sees the ticket channel (like Support Role)
                                
  })

simplydjs.suggestBtn(button, db, {   
  yesEmoji: '778611379560120320', // default: ☑️ 
  yesColor: '', // default: green 
  noEmoji: '778611410539905044', // default: X 
  noColor: '', // default: red 
  denyEmbColor: '#ED7A7A', // default: RED 
  agreeEmbColor: '#6EE57F', // default: GREEN 
  })
  
} 