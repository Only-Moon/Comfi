const { CommandInteraction, MessageEmbed } = require("discord.js");
const fetch = require("axios");

module.exports = {
      name: "avatar",
      description: "Gets the user or member avatar",
      options: [
        {
           name: "user",
           type: "SUB_COMMAND",
           description: "Gets the global avatar for the user",
           options: [
             {
           name: 'target',
           description: "The person that you want to get their avatar",
           type: "USER",
           required: false
                    },
                    ],
        },
       {
           name: "member",
           type: "SUB_COMMAND",
           description: "Gets the member avatar per server",
           options: [
             {
           name: 'target',
           description: "The person that you want to get their avatar",
           type: "USER",
           required: false,
                    },
                    ],
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
  
const [ choice ] = args
      
  let target = interaction.options.getUser('target')

    if(choice === 'user') {
        if(!target) target = interaction.user
        const avatarEmbed = new MessageEmbed().setTitle(`${target.tag}`).setImage(target.displayAvatarURL({ dynamic: true, size: 4096 })).setColor(bot.color)
        interaction.editReply({ embeds: [ avatarEmbed ] })
    } 
    
  if(choice == 'member') {
        if(!target) target = interaction.user

        let res = await fetch.get(`https://discord.com/api/guilds/${interaction.guild.id}/members/${target.id}`, {
            headers: {
                Authorization: `Bot ${bot.token}`
            }
        })

        if(res.data.avatar !== undefined && res.data.avatar !== null) {
            let url = `https://cdn.discordapp.com/guilds/${interaction.guild.id}/users/${target.id}/avatars/${res.data.avatar}.webp?size=4096`
            const avatarEmbed = new MessageEmbed().setTitle(`${target.tag}`).setImage(url).setColor(bot.color)
            interaction.editReply({ embeds: [ avatarEmbed ] })
        } else {
            const avatarEmbed = new MessageEmbed().setTitle(`${target.tag}`).setImage(target.displayAvatarURL({ dynamic: true, size: 4096 })).setColor(target.displayHexColor)
            interaction.editReply({ embeds: [ avatarEmbed ] })
        }
    }
}}