const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js");
const simplydjs = require('simply-djs')

module.exports = {
  config: {
    name: "set-ticket",
    aliases: ["setup-ticket"],
    description: "Sets the greet channel",
    usage: "set-greet-channel <Mention Channel> <Type>",
  }, 
  run: async (bot, message, args) => {


    simplydjs.ticketSystem(message, message.channel, { 
    embedDesc: 'Create a new Ticket By Clicking Below',
    embedColor: '#F8B6D4', // default: #075FFFF 
    embedFoot: '', // default: message.guild.name 
    credit: false,
    emoji: '855791964975530004', // default:, 🎫
    color: '', // default: blurple 
    })
    
  }}

