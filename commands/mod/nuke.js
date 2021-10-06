const { CommandInteraction, MessageEmbed } = require("discord.js");
module.exports = {
    name : 'nuke',
    category : 'Miscellaneous',
    description : 'A simple nuke command.',
    ownerOnly: false,
    options: [
       {
         name: "channel",
         description: "channel to nuke",
         type: "CHANNEL",
         required: false,
       },
       ],
    userperm: ["MANAGE_GUILD"],
    botperm: ["MANAGE_GUILD"],
     /**
      * 
      * @param {CommandInteraction} interaction 
      * @param {*} args
       */
    run: async(bot, interaction, args) => {
       
       let Channel = interaction.options.getChannel("channel") || interaction.channel
        
        Channel.clone().then((ch) => {
            ch.setParent(Channel.channel.parent.id)
            ch.setPosition(Channel.channel.position)
            Channel.delete();

            const NukeEmbed = new MessageEmbed()
            .setColor(bot.color)
            .setDescription(`${bot.tick}• **${interaction.user.tag}** Successfully Nuked this channel.`)
            .setImage("https://tenor.com/view/nuke-gif-8044239")
                  
    
            ch.send(NukeEmbed)

        
    })
}}
