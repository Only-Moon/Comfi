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
      interaction.channel.clone().then((ch) => {
            ch.setParent(interaction.channel.parent.id)
            ch.setPosition(interaction.channel.position)
            interaction.channel.delete();

            const NukeEmbed = new MessageEmbed()
            .setColor(bot.color)
            .setDescription(`${bot.tick}• **${interaction.user.tag}** Successfully Nuked this channel.`)
            .setImage("https://tenor.com/view/nuke-gif-8044239")
                  
    
            ch.send({
              embeds: [ NukeEmbed ]}).then((msg) => {
  setTimeout(() => { if(!msg.deleted) msg.delete() }, bot.ms('60s'))
  });;
       
    })

     } catch (err) {

return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`)
    }
      
}}
