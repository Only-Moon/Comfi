// url: https://luminabot.xyz/api/image/captcha?color=FFFFFF&text=6_charater_word


const guilds = require("../models/guild")
const { Message, MessageEmbed, GuildMember, MessageCollector } = require('discord.js')
const ms = require("ms")

/**
 * 
 * @param {Message} message
 * @param {GuildMember} member
 */ 
module.exports = async (member, bot) => {
    function format(msg) {
        let text = msg;
    
       const terms = [
         { name: '{{user#mention}}', value: `<@${member.id}>` },
         { name: '{{user#tag}}', value: `${member.user.tag}` },
         { name: '{{user#id}}', value: `${member.id}` },
         { name: '{{server#id}}', value: `${member.guild.id}` },
         { name: '{{server#name}}', value: `${member.guild.name}` },
         { name: '{{server#membercount}}', value: `${member.guild.memberCount}` },
       ];
       
       for (let { name, value } of terms) text = text.replace(new RegExp(name, 'igm'), value);
       
       return text
       }

    
    const guild = await guilds.findOne({guildId: member.guild.id})
    if(guild.verification) {
    if(!guild.verification_channel) return;
    const channel = member.guild.channels.cache.find(c => c.id === guild.verification_channel)
    if(!channel) return;
    const word = getWord()
    const embed = new MessageEmbed()
    .setImage(`https://luminabot.xyz/api/image/captcha?color=FFFFFF&text=${word}`)
    .setColor(bot.color)
        const hoisterMsg = await channel.send({content: `${format(guild.verification_message)}`, embeds: [embed]})

        const collector = new MessageCollector(channel, {time: 30000})
        collector.on("collect", (m) => {
            if(m.author.id !== member.id) return;
            if(m.content === word) {
                collector.stop("1")
                m.delete().catch(() => {})
                hoisterMsg.delete().catch(() => {})
            } else {
                collector.stop("0")
                m.delete().catch(() => {})
                hoisterMsg.delete().catch(() => {})
            }
        })

        collector.on("end", async (collected, reason) => {
            if(reason === "time") {
                hoisterMsg.delete().catch(() => {})
                channel.send({content: `${bot.error} • **TIMED OUT** Please redo the captcha!`})
                .then((meeeeees) => {
                    setTimeout(() => {
                        meeeeees.delete().catch(() => {})
                    }, ms('30 seconds'));
                })  
                await reRun(member, bot)
                return;
            }
            if(reason === "0") {
                channel.send({content: `${bot.error} • Invalid charaters provided! Please retry`})
                .then((meeeeees) => {
                    setTimeout(() => {
                        meeeeees.delete().catch(() => {})
                    }, ms('30 seconds'));
                })  
                await reRun(member, bot)
                hoisterMsg.delete().catch(() => {})
                return;
            }
            if(reason === "1") {
                member.roles.add(guild.verification_role).catch(() => {
                    return channel.send({content: `${bot.error} • There was an error giving you this role! Please report it to a server admin!`}).then((msg) => {
  setTimeout(() => msg.delete(), ms('30 seconds'))
  });
                }) 
                return channel.send({content: `<a:tick:890113862706266112> • Thank you for verifying in ${channel.guild.name}!`}).then((msg) => {
  setTimeout(() => msg.delete(), ms('30 seconds'))
  });
            }

        })

    }
}

function getWord() {
    let chars = "1234567890QWERTYUIOPASDFGHJKLZXCVBNMqweryuiopasdfghjklzxcvbnm"
    let str = ""
    for(let i =0; i< 6; i++) {
        str += chars[Math.floor(Math.random() * chars.length)]
    }
    return str
}

async function reRun(member, bot) {

    function format(msg) {
        let text = msg;
    
       const terms = [
         { name: '{{user#mention}}', value: `<@${member.id}>` },
         { name: '{{user#tag}}', value: `${member.user.tag}` },
         { name: '{{user#id}}', value: `${member.id}` },
         { name: '{{server#id}}', value: `${member.guild.id}` },
         { name: '{{server#name}}', value: `${member.guild.name}` },
         { name: '{{server#membercount}}', value: `${member.guild.memberCount}` },
       ];
       
       for (let { name, value } of terms) text = text.replace(new RegExp(name, 'igm'), value);
       
       return text
       }

    const guild = await guilds.findOne({guildId: member.guild.id})
    if(guild.verification) {
    if(!guild.verification_channel) return;
    const channel = member.guild.channels.cache.find(c => c.id === guild.verification_channel)
    if(!channel) return;
    const word = getWord()
    const embed = new MessageEmbed()
    .setImage(`https://luminabot.xyz/api/image/captcha?color=FFFFFF&text=${word}`)
    .setColor(bot.color)
    const hoisterMsg = await channel.send({content: `${format(guild.verification_message)}`, embeds: [embed]})

        const collector = new MessageCollector(channel, {time: 60000})
        collector.on("collect", (m) => {
            if(m.author.id !== member.id) return;
            if(m.content === word) {
                collector.stop("1")
                m.delete().catch(() => {})
                hoisterMsg.delete().catch(() => {})
            } else {
                collector.stop("0")
                m.delete().catch(() => {})
                hoisterMsg.delete().catch(() => {})
            }
        })

        collector.on("end", (collected, reason) => {
            if(reason === "time") {
                return channel.send({content: `${bot.error} • **TIMED OUT** Please redo the captcha!`})
            }
            if(reason === "0") {
                return channel.send({content: `${bot.error} • Invalid charaters provided!`})
            }
            if(reason === "1") {
                member.roles.add(guild.verification_role).catch(() => {
                    return channel.send({content: `${bot.error} • There was an error giving you this role! Please report it to a server admin!`})
                }) 
                return channel.send({content: `<a:tick:890113862706266112> • Thank you for verifying in ${channel.guild.name}!`})
            }

        })
    }
}
