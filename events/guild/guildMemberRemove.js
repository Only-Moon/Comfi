const { MessageEmbed, MessageAttachment } = require("discord.js")
const bot = require(`../../index`)
const guilds = require(`../../models/guild`)
const users = require("../../models/users")

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

if (guild.leveling_coleave) {

await users.findOneAndUpdate(
						{
							guildId: member.guild.id,
							userId: member.id,
						},
						{
							level:  0,
              xp:  0,
              requiredXp: 500,
						},
					);
  
}
  
    if(guild.leave) {
        const channel = member.guild.channels.cache.find(c => c.id === guild.leave_channel)
        if(channel) {
            if(guild.leave_embedtgl) {

              const emb = guild.leave_embed.map(async (em) => {

                const embed = new MessageEmbed()
                  .setAuthor(
                    em.embed.author ?.text ? em.embed.author ?.text : '',
                    em.embed.author ?.icon_url
                      ? em.embed.author ?.icon_url : '', em.embed.author ?.url ? em.embed.author ?.url : ''
					)
                  .setTitle(format(em.embed.title || ''))
                  .setDescription(format(em.embed.description || ''))
                  .setColor(em.embed.color || '#36393F')
                  .setImage(em.embed.image ? em.embed.image.url : "https://i.imgur.com/wyFi8zu.png")
                  .setURL(em.embed.url || '')
                  .setTimestamp(em.embed.timestamp ? new Date() : false)
                  .setThumbnail(em.embed.thumbnail ? em.embed.thumbnail : '')
                  .setFooter(format(em.embed.footer.text || ''))
                let cont = format(em.content);
                if
                  (guild.leave_dmuser) {
                  await member.send({
                    content: `${cont}`,
                    embeds: [embed]
                  }).catch(() => { })
                } else {
                  channel
                    .send({

                      content: `${cont}`,
                      embeds: [embed]
                    })
                    .catch(() => { })
                }

              })
            } else {
                if(guild.leave_dmuser) {
let leave_image = new MessageAttachment(`${guild.leave_image}`) 
                  member.send({content: `${format(guild.leave_message)}`, files: [ leave_image]}).catch(() => {})
              } else {
            
          const leave_image = new MessageAttachment(`${guild.leave_image}`) 
      
                    channel.send({content: `${format(guild.leave_message)}`, files: [ leave_image ]}).catch(() => {})
            }
            }
       }
    }
})
