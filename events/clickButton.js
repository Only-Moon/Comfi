const { MessageButton, MessageActionRow } = require('discord.js');
const config = require('../config.json');
const clientID = config.clientID; 
const clientSecret = config.clientSecret;
const Discord = require('discord.js');
const simplydjs = require('simply-djs-v13');
const { db } = require('../Database.js');

module.exports.run = async (message, button, bot) => {


  
  if (button.id === 'inviteyes') { button.reply.defer() 
  
  const inviteyb = new Discord.MessageEmbed() 
  .setTitle("Thanks for using the bot!") 
  .setDescription(`Here Is My Invite Links: \nServer Moderator: **[Click Me](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=2147483647)** \nServer Helper: **[Click Me](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=4294967287)** \n\nRecommended: **[Click Me](https://discord.com/oauth2/authorize?client_id=${clientID}&scope=bot&permissions=8589934591)**`)
  .setColor("GREEN"); 
  
  const joindsc = new MessageButton() .setStyle('url') 
  .setLabel(
    'Join Our Support Server!') 
    .setURL('https://discord.gg/remYPHCVgW'); 
  button.message.edit({button: joindsc, embed: inviteyb})
    
  }
  
  if(button.id === 'inviteno')   { button.reply.defer() 
  const noooyb = new Discord.MessageEmbed() 
  .setTitle('Okay Then') 
  .setDescription('But Please Join Our Support Server!') 
  .setColor("RED"); 
  
  const joindsc = new MessageButton() 
  .setStyle('url') 
  .setLabel('Join Our Support Server!')
  .setURL('https://discord.gg/remYPHCVgW'); 
  button.message.edit({button: joindsc, embed: noooyb})
  }
  
    button.clicker.fetch()
        embed1 = new Discord.MessageEmbed().setTitle(`Admin commands <a:bun_bounce_HE:798617643775033394>`).setDescription('Here area all the Available commands').addField("commands:", "** addcc, ai-setup, alt-config, autorole, bypass-alt, delcc, disablemodlogchannel, disablemuterole, fetch-alts, help-greetings, prefix, reply, setconfess, setmodlogchannel, setmuterole, setsuggest, svr**,").setColor("BLURPLE").setFooter('1/9').setThumbnail(button.clicker.user.displayAvatarURL());
        embed2 = new Discord.MessageEmbed().setTitle(`Emoji commands <a:llama_roll_HE:855602231986487326>`).setDescription('Here area all the Available commands').addField("commands:", "**add-these, addemoji, emoji-list, emoji**,").setColor("RED").setFooter('2/9').setThumbnail(button.clicker.user.displayAvatarURL());
        embed3 = new Discord.MessageEmbed().setTitle(`Economy commands <:currency_HE:812034164891189289>`).setDescription('Here area all the Available commands').addField("commands:", "**addmoney, balance, beg, daily, deposit, fish, leaderboard, pay, removemoney, roulette, sell, setbackground, setinfo, slots, weekly, withdraw, work**,").setColor("GRAY").setFooter('3/9').setThumbnail(button.clicker.user.displayAvatarURL());
        embed4 = new Discord.MessageEmbed().setTitle(`Fun Commands <a:730643342169210890:798458300219785216>`).setDescription('Here area all the Available commands').addField("commands:", "**8ball, advice, ascii, binary, clyde, coinflip, comment, connectfour, duelquiz, eject, embed, embedsay, emojify, fact, github, gunfight, howgay, meme, memory, roast, rps, say, shuffle-guess, status, tictactoe, urbandictionary, weather**,").setColor("GRAY").setFooter('4/9').setThumbnail(button.clicker.user.displayAvatarURL());
        embed5 = new Discord.MessageEmbed().setTitle(`Images Commands <a:pinktea_HE:796373339651571744>`).setDescription('Here area all the Available commands').addField("commands:", "**affect, avatarfusion, beautiful, cat, changemymind, delete, dog, dogfact, facepalm, fire, kangaroo, panda, respect, rip, scary, thomas, tobecontinued, trash, triggered, wasted**,").setColor("GREEN").setFooter('5/9').setThumbnail(button.clicker.user.displayAvatarURL());
        embed6 = new Discord.MessageEmbed().setTitle(`Info Commands <a:Pink_Bow_HE:783028553897869332>`).setDescription('Here area all the Available commands').addField("commands:", "**avatar, botinfo, bug, channelinfo, covid, djsdocs, playstore, roleinfo, rolememberinfo, serverav, serverinfo, ss, twitter, whois, wikipedia**,").setColor("GREEN").setFooter('6/9').setThumbnail(button.clicker.user.displayAvatarURL());
        embed7 = new Discord.MessageEmbed().setTitle(`Mod Commands <a:heartcharm_HE:783028559580495923>`).setDescription('Here area all the Available commands').addField("commands:", "**ban, deafen, dm, hackban, kick, lock, lockdown, mute, purge, resetwarns, roleadd, roledel, setnick, show-warns, slowmode, staff-apply, tempban, unban, undeafen, unlock, unmute, vcmove, warn**,").setColor("GREEN").setFooter('7/9').setThumbnail(button.clicker.user.displayAvatarURL());
        embed8 = new Discord.MessageEmbed().setTitle(`Music Commands <a:cat_tada_HE:779274421574959127>`).setDescription('Here area all the Available commands').addField("commands:", "**autoplay, filter, join, leave, loop, pause, play, queue, resume, seek, stop, volume**,").setColor("GREEN").setFooter('8/9').setThumbnail(button.clicker.user.displayAvatarURL());
        embed9 = new Discord.MessageEmbed().setTitle(`Utility Commands <a:paw_HE:797027740007661578>`).setDescription('Here area all the Available commands').addField("commands:", "**calculate, confess, hastebin, help, hp, invite, linkshorten, movie, ping, poll, removeafk, setafk, suggestion, translate, uptime, vote, youtube**,").setColor("GREEN").setFooter('9/9').setThumbnail(button.clicker.user.displayAvatarURL());
        
        pages = [embed1, embed2, embed3, embed4, embed5, embed6, embed7, embed8, embed9]

        let btn1 = new MessageButton()
            .setStyle('red')
            .setLabel('Admin commands')
            .setID('1');
        let btn2 = new MessageButton()
            .setStyle('red')
            .setLabel('Emoji commands')
            .setID('2');
        let btn3 = new MessageButton()
            .setStyle('blurple')
            .setLabel('Economy commands')
            .setID('3');
        let btn4 = new MessageButton()
            .setStyle('blurple')
            .setLabel('Fun Commands ')
            .setID('4');
        let btn5 = new MessageButton()
            .setStyle('blurple')
            .setLabel('Images Commands ')
            .setID('5');
        let btn6 = new MessageButton()
            .setStyle('blurple')
            .setLabel('Info Commands ')
            .setID('6');
        let btn7 = new MessageButton()
            .setStyle('green')
            .setLabel('Mod Commands ')
            .setID('7');
        let btn8 = new MessageButton()
            .setStyle('green')
            .setLabel('Music Commands ')
            .setID('8');
        let btn9= new MessageButton()
            .setStyle('gray')
            .setLabel('Utility Commands ')
            .setID('9'); 
        let btn10 = new MessageButton()  .setStyle('url') 
           .setLabel('Support Server!')
           .setURL('https://discord.gg/remYPHCVgW');    
        
let row = new MessageActionRow()
            .addComponent(btn1)
            .addComponent(btn2)
            .addComponent(btn3)
            .addComponent(btn4);

let row2 = new MessageActionRow()
            .addComponent(btn5)
            .addComponent(btn6)
            .addComponent(btn7)
            .addComponent(btn8);
            
let row3 = new MessageActionRow()
            .addComponent(btn9)
            .addComponent(btn10);

  
           if (button.id === '1') {
               await button.reply.defer();
               button.message.edit({
                    embed: embed1,
                    components: [row, row2, row3],
                });
            
            }
            if (button.id === '2') {
                await button.reply.defer();
                button.message.edit({
                    embed: embed2,
                    components: [row, row2, row3],
                });
            }
            if (button.id === '3') {
                await button.reply.defer();
                button.message.edit({
                    embed: embed3,
                    components: [row, row2, row3],
                });
            }
            if (button.id === '4') {
             await button.reply.defer();
                button.message.edit({
                    embed: embed4,
                    components: [row, row2, row3],
                });
            }
            if (button.id === '5') {
              await button.reply.defer();
                button.message.edit({
                    embed: embed5,
                    components: [row, row2, row3],
                });
            }
            if (button.id === '6') {
             await button.reply.defer();
                button.message.edit({
                    embed: embed6,
                    components: [row, row2, row3],
                });
            }
            if (button.id === '7') {
             await button.reply.defer();
                button.message.edit({
                    embed: embed7,
                    components: [row, row2, row3],
                });
            }
            if (button.id === '8') {
             await button.reply.defer();
                button.message.edit({
                    embed: embed8,
                    components: [row, row2, row3],
                });
            }
            if (button.id === '9') {
             await button.reply.defer();
                button.message.edit({
                    embed: embed9,
                    components: [row, row2, row3],
                });
            }


  
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