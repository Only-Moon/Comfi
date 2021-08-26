const Discord = require('discord.js')
const { MessageButton, MessageActionRow } = require('discord.js');
const simplydjs = require('simply-djs') 

module.exports = {
config: {
    name: "help",
    description: "Help Menu",
    category: 'utility',
    usage: "1) !help \n2) !help [module name]\n3) !help [command (name or alias)]",
    example: "1) !help\n2) !help util\n3) !help ban",
    aliases: ['hp']
},
run: async (bot, message, args) => {
    const avatar = message.author.displayAvatarURL();
        embed = new Discord.MessageEmbed()
          .setTitle('Hello!')
          .setDescription("****")
          .setThumbnail(bot.user.displayAvatarURL())
  
        embed1 = new Discord.MessageEmbed().setTitle(`Admin commands`).setDescription('Here area all the Available commands').addField("Commands:", "**addcc, alt-config, autorole, bypass-alt, chatbot, delcc, disablemodlogchannel, disablemuterole, fetch-alts, help-greetings, prefix, setconfess, setchatbotchannel, setmodlogchannel, setmuterole, setticketrole, setsuggest, set-ticket-catg, svr**").setColor("#F4B3CA").setFooter('1/1').setThumbnail(bot.user.displayAvatarURL());
        embed2 = new Discord.MessageEmbed().setTitle(`Emoji commands <a:llama_roll_HE:855602231986487326>`).setDescription('Here area all the Available commands').addField("Commands:", "**add-these, addemoji, emoji-list, emoji**").setColor("#F4B3CA").setFooter('1/1').setThumbnail(bot.user.displayAvatarURL());
        embed4 = new Discord.MessageEmbed().setTitle(`Fun Commands`).setDescription('Here area all the Available commands').addField("Commands:", "**8ball, advice, ascii, binary, clyde, coinflip, comment, connectfour, duelquiz, eject, emojify, fact, gunfight, howgay, meme, memory, roast, rps, shuffle-guess, status, tictactoe**").setColor("#F4B3CA").setFooter('1/1').setThumbnail(bot.user.displayAvatarURL());
        embed5 = new Discord.MessageEmbed().setTitle(`Images Commands`).setDescription('Here area all the Available commands').addField("Commands:", "**affect, avatarfusion, beautiful, cat, changemymind, delete, dog, dogfact, facepalm, fire, kangaroo, panda, respect, rip, scary, thomas, tobecontinued, trash, triggered, wasted**").setColor("#F4B3CA").setFooter('1/1').setThumbnail(bot.user.displayAvatarURL());
        embed6 = new Discord.MessageEmbed().setTitle(`Info Commands`).setDescription('Here area all the Available commands').addField("Commands:", "**avatar, botinfo, channelinfo, covid, playstore, roleinfo, rolememberinfo, serverav, serverinfo, ss, twitter, whois, wikipedia**,").setColor("#F4B3CA").setFooter('1/1').setThumbnail(bot.user.displayAvatarURL());
        embed7 = new Discord.MessageEmbed().setTitle(`Mod Commands`).setDescription('Here area all the Available commands').addField("Commands:", "**ban, deafen, dm, hackban, kick, lock, lockdown, mute, purge, resetwarns, roleadd, roledel, setnick, show-warns, slowmode, tempban, unban, undeafen, unlock, unmute, vcmove, warn**").setColor("#F4B3CA").setFooter('1/1').setThumbnail(bot.user.displayAvatarURL());
        embed8 = new Discord.MessageEmbed().setTitle(`Music Commands`).setDescription('Here area all the Available commands').addField("Commands:", "**play, setup, volume**").setColor("#F4B3CA").setFooter('1/1').setThumbnail(bot.user.displayAvatarURL());
        embed10 = new Discord.MessageEmbed().setTitle(`Slash Commands`).setDescription('Here area all the Available commands').addField("Commands:", "**8ball, anime-quote, anime-search, anime, bug, clever, covid, feedback, qrcode, roast, roleinfo, remind, user-info,  weather, ytt, **").setColor("#F4B3CA").setFooter('1/1').setThumbnail(bot.user.displayAvatarURL());        
        embed9 = new Discord.MessageEmbed().setTitle(`Utility Commands`).setDescription('Here area all the Available commands').addField("Commands:", "**calculate, confess, embed, embedsay, github, hastebin, help, linkshorten, movie, ping, poll, afk, suggestion, translate, uptime, urbandictionary, vote, youtube, weather**").setColor("#F4B3CA").setFooter('1/1').setThumbnail(bot.user.displayAvatarURL());

         let btn1 = new MessageButton()  
           .setStyle('LINK') 
           .setLabel('Invite me!')
           .setURL('https://discord.gg/remYPHCVgW');

        let btn10 = new MessageButton()  
           .setStyle('LINK') 
           .setLabel('Support Server!')
           .setURL('https://discord.gg/remYPHCVgW');    
            
        let row3 = new MessageActionRow()
            .addComponents(btn10)
            .addComponents(btn1);

simplydjs.dropdownPages(message, {
  type: 2, // default: 1
  embed: embed,
  placeHolder: 'Click To Veiw Particular Category',
  rows: [row3], // custom row to send the message with more buttons
  data:[
    {
      label: 'Admin/Setup Commands',
      desc:  'Commands Related to setups',
      emoji: '778636094136385576',
      embed: embed1, // embed sent when clicked
    },
    {
      label: 'Emoji Commands',
      desc:  'Commands Related to Emojis',
      emoji: '855602231986487326',
      embed: embed2, // embed sent when clicked
    },
    {
      label: 'Fun Commands ',
      desc:  'Commands Related to Fun and stuff',
      emoji: '798458300219785216',
      embed: embed4, // embed sent when clicked
    },
    {
      label: 'Image-Manipulation Commands',
      desc:  'Commands Related to Image manipulatiom',
      emoji: '796373339651571744',
      embed: embed5, // embed sent when clicked
    },
    {
      label: 'Information Commands',
      desc:  'Commands Related to Various types of information',
      emoji: '783028553897869332',
      embed: embed6, // embed sent when clicked
    },
    {
      label: 'Moderation Commands',
      desc:  'Commands Related to Moderation and stuff',
      emoji: '834310832434708560',
      embed: embed7, // embed sent when clicked
    },
    {
      label: 'Music Commands ',
      desc:  'Commands Related to music',
      emoji: '878180163848896562',
      embed: embed8, // embed sent when clicked
    },
    {
      label: 'Slash Commands ',
      desc:  'Commands used with slash ',
      emoji: '845489424933847093',
      embed: embed10, // embed sent when clicked
    },
    {
      label: 'Utility Commands',
      desc:  'Commands Related to various types of utilities',
      emoji: '797027740007661578',
      embed: embed9, // embed sent when clicked
    },
  ]
})

}
}