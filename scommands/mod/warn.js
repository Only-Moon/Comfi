const { db } = require('../../Database.js');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "warn-add",
    description: "Warn members",
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'User to warn',
            name: 'user',
            required: true,
        },
{
            type: 'STRING',
            description: 'Reason to warn user',
            name: 'reason',
            required: true,
        },
    ],
    userperm: ["MANAGE_MESSAGES"],
    botperm: ["MANAGE_SERVER"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
         let user = interaction.options.getUser('user') || interaction.guild.members.cache.get(args[0]);
            if(!user) return interaction.editReply("Please mention a valid member of this server");
        
            let reason = args.slice(1).join(' ');
            if(!reason) reason = "(No Reason Provided)";
            
            let warnings = await db.fetch(`warnings_${interaction.guild.id}_${user.id}`)
            
            if(warnings === 5) {
      return interaction.editReply(`${user} already reached his/her limit with 5 warnings`)
    }
    
    if(warnings === null) {
            
            await db.set(`warnings_${interaction.guild.id}_${user.id}`, 1)
  
      let warn = new MessageEmbed()
        .setTitle(`__Warned__`)    
        .setDescription(`You have been warned by ${interaction.user} \n Reason: ${reason}`)
            .setColor("#F4B3CA");
        user.send({embeds: [ warn ]})
            .catch(error => interaction.editReply(`Sorry ${interaction.user} I couldn't n't warn because of : ${error}`));
            let warnEmbed = new MessageEmbed()
            .setTitle("**__Warn Report__**")
            .setDescription(`**<${user}> has been warned by @${interaction.user}**`)
            .addField(`**Reason:**`, `\`${reason}\``)
            .addField(`**Action:**`, `\`Warn\``)
            .addField(`**Moderator:**`, `${interaction.user}`)
            .setColor("#F4B3CA");
            interaction.editReply({embeds: [ warnEmbed ]}).then(msg => msg.delete({
              timeout: 15000
            }));
    } else if (warnings !== null) {
      await db.add(`warnings_${interaction.guild.id}_${user.id}`, 1)

      let warn2 = new MessageEmbed()
       .setTitle(`__Warned__`)
        .setDescription(`You have been warned by ${interaction.user} \n Reason: ${reason}`)
        .setColor("#F4B3CA");
        user.send({embeds: [ warn2 ]})
            .catch(error => interaction.editReply(`Sorry <${interaction.user}> I couldn't n't warn because of : ${error}`));
            let ddEmbed = new MessageEmbed()
            .setTitle("**__Warn Report__**")
            .setDescription(`**${user} has been warned by <@${interaction.user.id}>**`)
            .addField(`**Reason:**`, `\`${reason}\``)
            .addField(`**Action:**`, `\`Warn\``)
            .addField(`**Moderator:**`, `${interaction.user}`)
      .setColor("#F4B3CA")
            interaction.editReply({embeds: [ ddEmbed ]})
    }

    }
}