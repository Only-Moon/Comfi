const { CommandInteraction, MessageEmbed } = require("discord.js")
const users = require(`../../models/users`)
module.exports = {
    name: "afk",
    description: "Sets your afk in the server",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Reason for going AFK',
            name: 'reason',
            required: true,
        },
    ],
    botperm: [],
    userperm: [],
    /**
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async(bot, interaction, args) => {

try {
      
        const user = await users.findOne({userId: interaction.user.id})
        if(!user) {
            await users.create({userId: interaction.user.id})
        }
       setTimeout(async () => {
        const reason = args.join(" ") || "No reason"
        const date = Date.now()

        await users.findOneAndUpdate({userId: interaction.user.id}, {
            afk: true,
            afk_reason: reason,
            afk_set: date,
        })
        
        const embed = new MessageEmbed()
			.setDescription(`You have been set to afk\n**Reason :** ${reason}`)
			.setColor(bot.color)
			.setAuthor(`${interaction.user.username}`, interaction.user.avatarURL({ dynamic: true }))
    .setFooter("Type a message to remove your AFK");
        
    if(interaction.member.manageable) interaction.member.setNickname("[AFK] " + interaction.member.displayName)
        
await interaction.editReply({embeds: [embed]})
       }, 1000);

     } catch (err) {

return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`)
    }  
  
    }
}