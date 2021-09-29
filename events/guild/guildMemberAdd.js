const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const { MessageEmbed } = require("discord.js")

bot.on("guildMemberAdd", async (member) => {
    const guild = await guilds.findOne({guildId: member.guild.id})
    require(`../../functions/verification`)(member, bot)
    

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

    
    if(guild.welcome) {
        const channel = member.guild.channels.cache.find(c => c.id === guild.welcome_channel)
        if(channel) {
            if(guild.welcome_embed) {
                const embed = new MessageEmbed()
                .setAuthor(`New Member!`, member.user.displayAvatarURL({dynamic: true}))
                .setDescription(format(guild.welcome_message))
                .setColor(bot.color)

                if(guild.welcome_dmuser) {
                    member.send({embeds: [embed]}).catch(() => {})
                } else {
                    channel.send({embeds: [embed]}).catch(() => {})
                }
            } else {
                if(guild.welcome_dmuser) {
                    member.send({content: `${format(guild.welcome_message)}`}).catch(() => {})
                } else {
                    channel.send({content: `${format(guild.welcome_message)}`}).catch(() => {})
                }
            }
        }
    }

    if(guild.auto_nick.toLowerCase() === "none") return;
  let nick = `${guild.auto_nick}`
    member.setNickname(`${nick}`+ member.user.username).catch(() => {})


})