const { MessageEmbed } = require("discord.js")
const bot = require(`../../index`)
const guilds = require(`../../models/guild`)

bot.on("guildMemberRemove", async (member) => {

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
    if(guild.leave) {
        const channel = member.guild.channels.cache.find(c => c.id === guild.leave_channel)
        if(channel) {
            if(guild.leave_embed) {
                const embed = new MessageEmbed()
                .setAuthor(`Member Left!`, member.user.displayAvatarURL({dynamic: true}))
                .setDescription(format(guild.leave_message))
                .setColor(bot.color)
              .setImage(guild.leave_image)

                if(guild.leave_dmuser) {
                    member.send({embeds: [embed]}).catch(() => {})
                } else {
                    channel.send({embeds: [embed]}).catch(() => {})
                }
            } else {
                if(guild.leave_dmuser) {
let leave_image = new MessageAttachment(`${guild.welcome_image}`) 
                    member.send({content: `${format(guild.leave_message)}`, files: [ leave_image]}).catch(() => {})
                } else {

let leave_image = new MessageAttachment(`${guild.welcome_image}`) 

                    channel.send({content: `${format(guild.leave_message)}`, files: [ leave_image ]}).catch(() => {})
                }
            }
        }
    }
})
