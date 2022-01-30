
const { CommandInteraction, MessageEmbed } = require("discord.js")
const guilds = require("../../models/guild")

module.exports = {
    name: "verify-user",
    description: "Force verify a user / bot!",
  directory: "mod",
    ownerOnly: false,
    options: [
    {
        name: "user",
        type: "USER",
        description: "user/bot to verify",
        required: true,
    }
    ],
    botperm: ["MANAGE_ROLES"],
    userperm: ["ADMINISTRATOR"],
    /**
     * @param {CommandInteraction} interaction 
     * @param {String[]} args
     */
    run: async(bot, interaction, args) => {
        const guild = await guilds.findOne({guildId: interaction.guild.id})
        if(guild.verification) {
            const member = interaction.options.getMember('user')

            await member.roles.add(guild.verification_role).catch((e) => {
        bot.sendhook(
          `Error Occured \n ${e.stack}`
        , {
          channel: bot.err_chnl
        } )
        interaction.followUp({
          embeds: [
            {
        description: `${bot.error} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
        color: bot.color,  
           },
        ]
        });
        })
            const embed = new MessageEmbed()
                .setDescription(` > ${bot.tick} • ${member} has been verified!`)
                .setColor(bot.color)
                interaction.editReply({embeds: [embed]})
                
        } else {
            return interaction.editReply({content: `${bot.crosss} • Please setup verification by doing /verification before using this command!`})
        }
    }
}