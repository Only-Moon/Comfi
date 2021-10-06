const { CommandInteraction, MessageEmbed, MessageCollector } = require("discord.js")
const guilds = require("../../models/guild")

module.exports = {
    name: "membercount",
    description: "Setup the counting system",
    ownerOnly: false,
    botperm: [],
    userperm: ["ADMINISTRATOR"],
    /**
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async(bot, interaction, args) => {
        const step1 = new MessageEmbed()
        .setTitle(`Membercount system! [1]`, bot.user.displayAvatarURL())
        .setDescription(`Would you like to enable or disabled the feature? Types: \`disable\`,\`enable\``)
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

        const step2 = new MessageEmbed()
        .setTitle(`Membercount system! [2]`, bot.user.displayAvatarURL())
        .setDescription(`What type of channel should the member counter channel be? (Types: \`text\`,\`voice\`)`)

         const step3 = new MessageEmbed()
        .setTitle(`Membercount system! [3]`, bot.user.displayAvatarURL())
        .setDescription(`What name of member counter channel be? (For eg: \`Members: \`\`00\`)`)      
        .setColor(bot.color)
        .setFooter(`You can say "cancel" at any time to cancel the process`)

        let steps = [step1, step2, step3]
        let counter = 0
        interaction.deleteReply()
        let hoisterMessage = await interaction.channel.send({embeds: [steps[counter]]})
        const finalData = {
            value: undefined,
            channel: undefined,
            channel_type: undefined,
            channel_name: undefined
        }
        const collector = new MessageCollector(interaction.channel)

        collector.on("collect", async (msg) => {
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
                    if(!["text","voice"].includes(msg.content.toLowerCase())) {
                        collector.stop("1")
                        hoisterMessage.delete().catch(() => {})
                    }
                    let type
                    if(msg.content.toLowerCase() === "text") {
                        type = "GUILD_TEXT"
                    }
                    if(msg.content.toLowerCase() === "voice") {
                        type = "GUILD_VOICE"
                    }
                    const channel = await interaction.guild.channels.create(`Member: ${interaction.guild.memberCount}`, {
                        type: type
                    })
                    if(channel.type === "GUILD_VOICE") {
                        interaction.guild.roles.cache.forEach((r) => {
                            channel.permissionOverwrites.create(r.id, {
                                CONNECT: false
                            })
                        })
                    }
                    msg.delete().catch(() => {})
                    finalData['channel'] = channel.id
                    finalData['channel_type'] = type

                    counter++
                    hoisterMessage.edit({embeds: [steps[counter]]}).catch(() => {})
                break;
                case 2:
finalData['channel_name'] = msg.content
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
               return interaction.channel.send({content: `${bot.error} • There was an error with your anwser, please make sure to follow the steps!`})
            }
            if(reason === "4") {
                await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    member_counter: false
                })
                return interaction.channel.send({content: `${bot.tick} • Counting have now been disabled!`})
                
            }
            if(reason === "2") {
                await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                    member_counter: true,
                    member_counter_channel: finalData.channel,
                    member_counter_channel_type: finalData.channel_type,
                    member_counter_channel_name: finalData.channel_name,
                })
                return interaction.channel.send({content: `${bot.tick} • Counting data has now been setup! **The channel updates every 10 minutes** (Don't worry Channel Name will Update with the name you specified 
very soon)`})
            }
        })
    }
}