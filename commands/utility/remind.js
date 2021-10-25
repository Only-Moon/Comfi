const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require('ms')
module.exports = {
    name: "remind",
    description: "Set a reminder",
    ownerOnly: false,
    options: [
        {
            name: "time",
            description: "when do you want to be reminded",
            type: "STRING",
            required: true,
        
        },
        {
            name: "reminder",
            description: "what do you want to be reminded about",
            type: "STRING",
            required: true,
        },
    ],
    userperm: [""],
    botperm: [""],

    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

         const [t, r] = args;
        

        
        let time = t
        let reminder = r

        const wrongtime = new MessageEmbed()
            .setColor(bot.color)
            .setDescription(`**Sorry I only do d, m, h, or s.**`)

            if (
                !time.endsWith("d") &&   
                !time.endsWith("m") &&
                !time.endsWith("h") &&
                !time.endsWith("s")
            )
    
                return interaction.followUp({embeds: [wrongtime]})
                
                const remindertime = new MessageEmbed()
                .setColor(bot.color)
                .setDescription(`\**Your reminder will go off in ${time}**`)
                interaction.followUp({embeds: [remindertime]})

                const reminderdm = new MessageEmbed()
                .setColor(bot.color)
                .setTitle('**REMINDER**')
                .setDescription(`**It has been ${time}** \nReminder: **${reminder}**`)  
        
                setTimeout(async function () {
                   try{
        
                    await interaction.user.send({embeds: [reminderdm]})
     } catch (err) {

return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`)
    } 
                   
                }, ms(time));
            
    },
};