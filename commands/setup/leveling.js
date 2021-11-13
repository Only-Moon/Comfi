const { CommandInteraction, MessageEmbed, MessageCollector } = require("discord.js")
const guilds = require("../../models/guild")

module.exports = {
    name: "leveling",
    description: "Setup server leveling",
    ownerOnly: false,
    botperm: ["MANAGE_GUILD", "SEND_MESSAGES"],
    userperm: ["ADMINISTRATOR"],
    /**
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async(bot, interaction, args) => {
        const step1 = new MessageEmbed()
        .setTitle(`Leveling [1]`, bot.user.displayAvatarURL())
        .setDescription(`Would you like to enable or disabled the feature? Types: \`disable\`,\`enable\``)
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

        const step2 = new MessageEmbed()
        .setTitle(`Leveling [2]`, bot.user.displayAvatarURL())
        .setDescription(`What should the leveling channel be? (Use **bind** to set it to respond the the current channel!)`)
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

        const step3 = new MessageEmbed()
        .setTitle(`Leveling [3]`, bot.user.displayAvatarURL())
        .setDescription(`What should the level up message be?\n\`\`\`{{user#mention}} - the users id\n{{user#tag}} - the users tag\n{{user#id}} - the users id\n{{level}} - the users new level\n{{xp}} - the users xp\n{{requiredxp}} - the new required xp amount\n\`\`\``)
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

        let steps = [step1, step2, step3]
        let counter = 0
      await interaction.deleteReply().catch(() => null)
        let hoisterMessage = await interaction.channel.send({embeds: [steps[counter]]})
        const finalData = {
            value: undefined,
            channel: undefined,
            interaction: undefined,
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
                    if(msg.content.toLowerCase() === "bind") {
                        finalData['channel'] === "message"
                    } else {

                    if(!channel) {
                        collector.stop("1")
                        hoisterMessage.delete().catch(() => {})
                        return;
                    }
                    
                    finalData['channel'] = channel.id
                    }
                    msg.delete().catch(() => {})
                    counter++
                    hoisterMessage.edit({embeds: [steps[counter]]}).catch(() => {})
                break;
                case 2: 

        if(msg.content.lengt >= "4096") {
                        collector.stop("3")
                        hoisterMessage.delete().catch(() => {})
                        return;
                                                  }
          
                    finalData['message'] = msg.content.split("").slice(0,4096).join("")
                    msg.delete().catch(() => {})
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
               return interaction.channel.send({content: `${bot.crosss} • There was an error with your anwser, please make sure to follow the steps!`})
            }
            if(reason === "3") {
               return interaction.channel.send({content: `${bot.crosss} • Leveling Message  should not contain more than 1024 characters`})
            }
            if(reason === "4") {
                await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    leveling: false
                })
                return interaction.channel.send({content: `${bot.tick} • Leveling have now been disabled!`})
                
            }
            if(reason === "2") {
                await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    leveling: true,
                    leveling_channel: finalData.channel,
                    leveling_message: finalData.message,
                })
                return interaction.channel.send({content: `${bot.tick} • Leveling data has now been setup!`})
            }
        })
    }
}