const Discord = require('discord.js')
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = {
config: {
    name: "hp",
    description: "Help Menu",
    category: 'utility',
    usage: "1) !help \n2) !help [module name]\n3) !help [command (name or alias)]",
    example: "1) !help\n2) !help util\n3) !help ban",
    aliases: ['hpp']
},
run: async (bot, message, args) => {
    const avatar = message.author.displayAvatarURL();
        embeds = new Discord.MessageEmbed().setTitle('Hello!').setDescription('By clicking on any of these buttons under this embed you will get list of commands.').setColor('#ffa861').setTimestamp();
        embed1 = new Discord.MessageEmbed().setTitle(`Admin commands 🧍`).setDescription('Here area all the Available commands').addField("commands:", "** addcc, ai-setup, alt-config, autorole, bypass-alt, delcc, disablemodlogchannel, disablemuterole, fetch-alts, help-greetings, prefix, reply, setconfess, setmodlogchannel, setmuterole, setsuggest, svr**,").setColor("BLURPLE").setFooter('1/9').setThumbnail(avatar)
        embed2 = new Discord.MessageEmbed().setTitle(`Emoji commands⛔️`).setDescription('Here area all the Available commands').addField("commands:", "**add-these, addemoji, emoji-list, emoji**,").setColor("RED").setFooter('2/9').setThumbnail(`${avatar}`)
        embed3 = new Discord.MessageEmbed().setTitle(`Economy commands 🎤`).setDescription('Here area all the Available commands').addField("commands:", "**addmoney, balance, beg, daily, deposit, fish, leaderboard, pay, removemoney, roulette, sell, setbackground, setinfo, slots, weekly, withdraw, work**,").setColor("GRAY").setFooter('3/9').setThumbnail(`${avatar}`)
        embed4 = new Discord.MessageEmbed().setTitle(`Fun Commands 🎮`).setDescription('Here area all the Available commands').addField("commands:", "**8ball, advice, ascii, binary, clyde, coinflip, comment, connectfour, duelquiz, eject, embed, embedsay, emojify, fact, github, gunfight, howgay, meme, memory, roast, rps, say, shuffle-guess, status, tictactoe, urbandictionary, weather**,").setColor("GRAY").setFooter('4/9').setThumbnail(`${avatar}`)
        embed5 = new Discord.MessageEmbed().setTitle(`Images Commands 🤪`).setDescription('Here area all the Available commands').addField("commands:", "**affect, avatarfusion, beautiful, cat, changemymind, delete, dog, dogfact, facepalm, fire, kangaroo, panda, respect, rip, scary, thomas, tobecontinued, trash, triggered, wasted**,").setColor("GREEN").setFooter('5/9').setThumbnail(`${avatar}`)
        embed6 = new Discord.MessageEmbed().setTitle(`Info Commands 🤪`).setDescription('Here area all the Available commands').addField("commands:", "**avatar, botinfo, bug, channelinfo, covid, djsdocs, playstore, roleinfo, rolememberinfo, serverav, serverinfo, ss, twitter, whois, wikipedia**,").setColor("GREEN").setFooter('6/9').setThumbnail(`${avatar}`)
        embed7 = new Discord.MessageEmbed().setTitle(`Mod Commands 🤪`).setDescription('Here area all the Available commands').addField("commands:", "**ban, deafen, dm, hackban, kick, lock, lockdown, mute, purge, resetwarns, roleadd, roledel, setnick, show-warns, slowmode, staff-apply, tempban, unban, undeafen, unlock, unmute, vcmove, warn**,").setColor("GREEN").setFooter('7/9').setThumbnail(`${avatar}`)
        embed8 = new Discord.MessageEmbed().setTitle(`Music Commands 🤪`).setDescription('Here area all the Available commands').addField("commands:", "**autoplay, filter, join, leave, loop, pause, play, queue, resume, seek, stop, volume**,").setColor("GREEN").setFooter('8/9').setThumbnail(`${avatar}`)
        embed9 = new Discord.MessageEmbed().setTitle(`Utility Commands 🤪`).setDescription('Here area all the Available commands').addField("commands:", "**calculate, confess, hastebin, help, hp, invite, linkshorten, movie, ping, poll, removeafk, setafk, suggestion, translate, uptime, vote, youtube**,").setColor("GREEN").setFooter('9/9').setThumbnail(`${avatar}`)
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
            .setStyle('gray')
            .setLabel('Economy commands')
            .setID('3');
        let btn4 = new MessageButton()
            .setStyle('gray')
            .setLabel('Fun Commands ')
            .setID('4');
        let btn5 = new MessageButton()
            .setStyle('green')
            .setLabel('Images Commands ')
            .setID('5');
        let btn6 = new MessageButton()
            .setStyle('green')
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
            .setStyle('green')
            .setLabel('Utility Commands ')
            .setID('9');    
        let row = new MessageActionRow()
            .addComponent(btn1)
            .addComponent(btn2)
            .addComponent(btn3)
            .addComponent(btn4)
            .addComponent(btn5);

let row2 = new MessageActionRow()
            .addComponent(btn6)
            .addComponent(btn7)
            .addComponent(btn8)
            .addComponent(btn9);


let msg = await message.channel.send({
            components: [row, row2],
            embed: embeds
          });

     

   bot.on('clickButton', async (button) => {
            if (button.id === '1') {
                await button.reply.defer();
                msg.edit({
                    embed: embed2,
                    components: [row, row2],
                });
            }
            if (button.id === '2') {
                await button.reply.defer();
                msg.edit({
                    embed: embed2,
                    components: [row, row2],
                });
            }
            if (button.id === '3') {
                await button.reply.defer();
                msg.edit({
                    embed: embed3,
                    components: [row, row2],
                });
            }
            if (button.id === '4') {
             await button.reply.defer();
                msg.edit({
                    embed: embed4,
                    components: [row, row2],
                });
            }
            if (button.id === '5') {
              await button.reply.defer();
                msg.edit({
                    embed: embed5,
                    components: [row, row2],
                });
            }
            if (button.id === '6') {
             await button.reply.defer();
                msg.edit({
                    embed: embed6,
                    components: [row, row2],
                });
            }
            if (button.id === '7') {
             await button.reply.defer();
                msg.edit({
                    embed: embed7,
                    components: [row, row2],
                });
            }
            if (button.id === '8') {
             await button.reply.defer();
                msg.edit({
                    embed: embed8,
                    components: [row, row2],
                });
            }
            if (button.id === '9') {
             await button.reply.defer();
                msg.edit({
                    embed: embed9,
                    components: [row, row2],
                });
            }
        })
}
}
