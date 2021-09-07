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
            .setColor('#F4B3CA')
            .setDescription(`**Sorry I only do d, m, h, or s.**`)

            if (
                !time.endsWith("d") &&   
                !time.endsWith("m") &&
                !time.endsWith("h") &&
                !time.endsWith("s")
            )
    
                return interaction.followUp({embeds: [wrongtime]})
                
                const remindertime = new MessageEmbed()
                .setColor('#F4B3CA')
                .setDescription(`\**Your reminder will go off in ${time}**`)
                interaction.followUp({embeds: [remindertime]})

                const reminderdm = new MessageEmbed()
                .setColor('#F4B3CA')
                .setTitle('**REMINDER**')
                .setDescription(`**It has been ${time} here is your reminder:** ${reminder}`)  
        
                setTimeout(async function () {
                   try{
        
                    await interaction.user.send({embeds: [reminderdm]})
                   }catch(err){
        
                   } 
                   
                }, ms(time));
            
    },
};