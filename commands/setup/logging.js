const { CommandInteraction, MessageEmbed, MessageCollector } = require("discord.js")
const guilds = require("../../models/guild")

module.exports = {
    name: "logging",
    description: "Setup server logging",
    ownerOnly: false,
    botperm: ["MANAGE_ROLES"],
    userperm: ["ADMINISTRATOR"],
    /**
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async(bot, interaction, args) => {
        const step1 = new MessageEmbed()
        .setTitle(`Logging [1]`, bot.user.displayAvatarURL())
        .setDescription(`Would you like to enable or disabled the feature? Types: \`disable\`,\`enable\``)
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

        const step2 = new MessageEmbed()
        .setTitle(`Logging [2]`, bot.user.displayAvatarURL())
        .setDescription(`What should the logging channel be?`)
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

       
        let steps = [step1, step2]
        let counter = 0
        interaction.deleteReply()
        let hoisterMessage = await interaction.channel.send({embeds: [steps[counter]]})
        const finalData = {
            value: undefined,
            channel: undefined,
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
                        return;
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
            if(reason === "4") {
                await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    logging: false
                })
                return interaction.channel.send({content: `${bot.tick} • Logging have now been disabled!`})
                
            }
            if(reason === "2") {
                await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    logging: true,
                    logging_channel: finalData.channel,
                })
                return interaction.channel.send({content: `${bot.tick} • Logging data has now been setup!`})
            }
        })
    }
}