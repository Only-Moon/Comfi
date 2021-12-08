const { CommandInteraction, MessageEmbed } = require("discord.js");
const ms = require("ms");

module.exports = {
    name : 'nuke',
    description : 'A simple nuke command.',
    ownerOnly: false,
    userperm: ["MANAGE_GUILD"],
    botperm: ["MANAGE_GUILD"],
     /**
      * 
      * @param {CommandInteraction} interaction 
      * @param {*} args
       */
    run: async(bot, interaction, args) => {
       
    try {
      interaction.channel.clone().then(async(ch) => {
            await ch.setParent(interaction.channel.parent.id)
            await ch.setPosition(interaction.channel.position)
            await interaction.channel.delete();

            const NukeEmbed = new MessageEmbed()
            .setColor(bot.color)
            .setDescription(`${bot.tick}• **${interaction.user.tag}** Successfully Nuked this channel.`)
            .setImage("https://tenor.com/view/nuke-gif-8044239")
                  
    
            ch.send({
              embeds: [ NukeEmbed ]}).then((msg) => {
  setTimeout(() => { if(!msg.deleted) msg.delete() }, bot.ms('60s'))
  });;
       
    }).catch(() => null)

     } catch(e) {
        bot.sendhook(
          `Error Occured \n ${e.stack}`
        ), {
          channel: bot.err_chnl
        } 
        interaction.followUp({
          embeds: [
            {
        description: `${bot.error} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
        color: bot.color,  
           },
        ]
        });
        }
      
}}
