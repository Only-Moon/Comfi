const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: "invite",
    description: "Sends an invite for the bot",
    ownerOnly: false,

    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
        const embed = new MessageEmbed()
          .setAuthor("Hello Dear!", interaction.user.avatarURL({ dynamic: true }))
          .setTitle('Comfi Invite Link!')
        .setDescription("I'm a cool Discord Bot, ain't I? Use the buttons below to invite me to your server or join our support server!\n\nStay Safe")
         .setThumbnail(bot.user.displayAvatarURL()) 
          .setColor("#F4B3CA");
      
      const yes = new MessageButton() 
        .setStyle("SUCCESS") 
        .setLabel("Sure!") 
        .setCustomId("inviteyes"); 
      
      const no = new MessageButton() 
        .setStyle("DANGER") 
        .setLabel('Nope!') 
        .setCustomId('inviteno');

      const row = new MessageActionRow() 			
        .addComponents(yes) 
        .addComponents(no); 
      
 interaction.editReply({ content: `<@${interaction.user.id}>`, embeds: [embed], components: [row] })
    },
};