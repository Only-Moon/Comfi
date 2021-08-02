const { MessageEmbed } = require("discord.js");
const db = require("old-wio.db");
const Discord = require("discord.js");
const simplydjs = require('simply-djs')

module.exports = {
  config: {
    name: "set-ticketl",
    aliases: ["setup-ticket"],
    description: "Sets the greet channel",
    usage: "set-greet-channel <Mention Channel> <Type>",
  }, 
  run: async (bot, message, args) => {
    
    simplydjs.ticketSystem(message, message.channel, { 
    embedDesc: '', // default: '🎫 Create a ticket by clicking the button 🎫'
    embedColor: '', // default: #075FFFF 
    embedFoot: '', // default: message.guild.name 
    emoji: '', // default:, 🎫
    color: '', // default: blurple 
    })
    
  }}