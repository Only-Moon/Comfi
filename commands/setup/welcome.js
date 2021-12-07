const { CommandInteraction, MessageEmbed, MessageCollector } = require("discord.js")
const guilds = require("../../models/guild")

module.exports = {
    name: "welcome",
    description: "Setup server welcome system",
    type: "CHAT_INPUT",
    ownerOnly: false,
    botperm: ["MANAGE_GUILD"],
    userperm: ["ADMINISTRATOR"],
    /**
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async(bot, interaction, args) => {
        const step1 = new MessageEmbed()
        .setTitle(`Welcome Message / Embed [1]`, bot.user.displayAvatarURL())
        .setDescription(`Would you like to enable or disabled the feature? Types: \`disable\`,\`enable\``)
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

        const step2 = new MessageEmbed()
        .setTitle(`Welcome Message / Embed [2]`, bot.user.displayAvatarURL())
        .setDescription(`What should the welcome message channel be?`)
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

        const step3 = new MessageEmbed()
        .setTitle(`Welcome Message / Embed [3]`, bot.user.displayAvatarURL())
        .setDescription(`Should the bot dm the user the message? Types: \`true\`,\`false\``)
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

        const step4 = new MessageEmbed()
        .setTitle(`Welcome Message / Embed [4]`, bot.user.displayAvatarURL())
        .setDescription(`Should the message be in an embed? Types: \`true\`,\`false\``)
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

        const step5 = new MessageEmbed()
        .setTitle(`Welcome Message / Embed [5]`, bot.user.displayAvatarURL())
        .setDescription(`What should the welcome Message be?`)
        .addFields({name: "Tags", value: `\`\`\`{{user#mention}} - mentions the user\n{{user#tag}} - the users tag\n{{user#id}} - the users id\n{{server#membercount}} - the servers membercount\n{{server#name}} - the servers name\n{{server#id}} - the servers id\n\`\`\``})
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

        const step6 = new MessageEmbed()
        .setTitle(`Welcome Message / Embed [4]`, bot.user.displayAvatarURL())
        .setDescription(`What should the welcome image be ( **Only Url** ). Say **skip** to use the default ones`)
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

        let steps = [step1, step2, step3, step4, step5, step6]
        let counter = 0
       await interaction.deleteReply().catch(() => null)
        let hoisterMessage = await interaction.channel.send({embeds: [steps[counter]]})
        const finalData = {
            value: undefined,
            channel: undefined,
            dm: undefined,
            embed: undefined,
            message: undefined,
            image: undefined
        }
        const collector = new MessageCollector(interaction.channel)

        collector.on("collect", (msg) => {
            if(msg.author.id !== interaction.user.id) return;
            if(msg.content.toLowerCase() === "cancel") {
                collector.stop("0")
                hoisterMessage.delete().catch(() => {})
            }

            switch (counter) {
                case 0: 
                    if(!["enable",'disable'].includes(msg.content.toLowerCase())) {
                        collector.stop("1")
                        hoisterMessage.delete().catch(() => {})
                    }

                    if(msg.content.toLowerCase() === "disable") {
                        collector.stop("4")
                        hoisterMessage.delete().catch(() => {})
                    }

                    let val = false
                    if(msg.content.toLowerCase() === "enable") {
                        val = true
                    } else {
                        val = false
                    }

                    finalData['value'] = val
                    msg.delete().catch(() => {})
                    counter++
                    hoisterMessage.edit({embeds: [steps[counter]]}).catch(() => {})
                break;
                case 1: 

                    let channel = msg.mentions.channels.first() ||
                    interaction.guild.channels.cache.find(c => c.id === msg.content || c.name.toLowerCase() === msg.content.toLowerCase())

                    if(!channel) {
                        collector.stop("1")
                        hoisterMessage.delete().catch(() => {})
                        return;
                    }
                    msg.delete().catch(() => {})
                    finalData['channel'] = channel.id
                    counter++
                    hoisterMessage.edit({embeds: [steps[counter]]}).catch(() => {})
                break;
                case 2:
                    if(!["true",'false'].includes(msg.content.toLowerCase())) {
                        collector.stop("1")
                        hoisterMessage.delete().catch(() => {})
                    }

                    let val2 = false
                    if(msg.content.toLowerCase() === "true") {
                        val2 = true
                    } else {
                        val2 = false
                    }
                    msg.delete().catch(() => {})
                    finalData['dm'] = val2
                    counter++
                    hoisterMessage.edit({embeds: [steps[counter]]}).catch(() => {})
                break;
                case 3: 
                    if(!["true",'false'].includes(msg.content.toLowerCase())) {
                        collector.stop("1")
                        hoisterMessage.delete().catch(() => {})
                    }

                    let val3 = false
                    if(msg.content.toLowerCase() === "true") {
                        val3 = true
                    } else {
                        val3 = false
                    }
                    msg.delete().catch(() => {})
                    finalData['embed'] = val3
                    counter++
                    hoisterMessage.edit({embeds: [steps[counter]]}).catch(() => {})
                break;
                case 4: 

        if(msg.content.lengt >= "4096") {
                        collector.stop("3")
                        hoisterMessage.delete().catch(() => {})
                        return;
                                                  }
          
                    finalData['message'] = msg.content.split("").slice(0,4096).join("")
                    msg.delete().catch(() => {})
                    counter++
                    hoisterMessage.edit({embeds: [steps[counter]]}).catch(() => {})
                break;
                case 5:
                    if(msg.content.toLowerCase() === "skip") {                
  finalData['image'] = "https://i.imgur.com/8MggL9S.png";
 msg.delete().catch(() => {})           
              } else {
                      
  finalData['image'] = msg.content || msg.attachments.first().url
                    }
                    hoisterMessage.delete().catch(() => {})
                    collector.stop("2")
                    
                break;
            }
        })


        collector.on('end', async (collected, reason) => {
            if(reason === "0") {
                return interaction.channel.send({content: `${bot.crosss} • Process has been stopped!`})
            }
            if(reason === "1") {
               return interaction.channel.send({content: `${bot.error} • There was an error with your anwser, please make sure to follow the steps!`})
            }
            if(reason === "3") {
               return interaction.channel.send({content: `${bot.crosss} • Welcome Message  should not contain more than 1024 characters`})
            }
            if(reason === "4") {
                await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    welcome: false
                })
                return interaction.channel.send({content: `${bot.tick} • Welcomes have now been disabled!`})
                
            }
            if(reason === "2") {
                await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    welcome: true,
                    welcome_dmuser: finalData.dm,
                    welcome_channel: finalData.channel,
                    welcome_message: finalData.message,
                    welcome_embed: finalData.embed,
                    welcome_image: finalData.image
                })
                return interaction.channel.send({content: `${bot.tick} • Welcome data has now been setup! Dont delete the image above if you sent one`})
            }
        })
    }
}