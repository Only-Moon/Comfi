const { Interaction, MessageEmbed } = require("discord.js");
const guilds = require('../../models/guild');

module.exports = {
  name: "unmute",
  description: "Unmute Someone",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "User To Unmute",
      type: 6,
      required: true,
    },
  ],
  userperm: ["MANAGE_ROLES"],
  botperm: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
  /**
   *
   * @param {Interaction} interaction
   */
  run: async (bot, interaction) => {
    try {
      const mutee = interaction.options.getMember('user') || interaction.guild.members.cache.get(args[0]) || interaction.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || interaction.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
      if (!mutee) return interaction.editReply(`${bot.error} **Please Enter A Valid User!**`);

                const guild = await guilds.findOne({guildId: interaction.guild.id})
      
      let muterole; 
      let dbmute = guild.muterole;
      let muteerole = interaction.guild.roles.cache.find(r => r.name === "muted") 
        if (!interaction.guild.roles.cache.has(dbmute)) { 
          muterole = muteerole
        } else { 
          muterole = interaction.guild.roles.cache.get(dbmute) 
        } 
      
      let rolefetched = guild.mutedrole
        
      if (!rolefetched) return; 
      
      if (!muterole) return interaction.editReply(`${bot.error} **There Is No Mute Role To Remove!**`) 
      if (!mutee.roles.cache.has(muterole.id)) return interaction.editReply(`${bot.error} **User is not Muted!**`) 
        
      try { 
        mutee.roles.remove(muterole.id).then(() => { 
          mutee.send(`**Hello, You Have Been Unmuted In ${interaction.guild.name}**`).catch(() => null) 
            let roleadds = rolefetched
        
              if (!roleadds) return;
          
          roleadds.forEach(role => mutee.roles.add(role))
        }) 
      } catch { 
  let roleadds2 = rolefetched 
  if (!roleadds2) return; 
  mutee.roles.add([ roleadds2 ]) 
      
      } 
const sembed = new MessageEmbed() 
  .setColor(bot.color)
  .setDescription(`${mutee.user.username} was successfully unmuted.`) 
        
interaction.editReply({embeds: [ sembed ]}); 

    if(!guild.modlog) return;

    if(guild.modlog) {
            let channel = interaction.guild.channels.cache.find(c => c.id === guild.mod_channel)
                if (!channel) return;

        let embeds1 = new MessageEmbed()
            .setColor(bot.color)
            .setThumbnail(mutee.user.avatarURL({ dynamic: true }))
            .setAuthor(`${interaction.guild.name} Modlogs`, interaction.guild.iconURL())
            .addField("**Moderation**", "unmute")
            .addField("**Unmuted**", mutee.user.username.toString())
            .addField("**Moderator**", interaction.user.username)
            .addField("**Date**", interaction.createdAt.toString())
            .setFooter(interaction.guild.name, interaction.guild.iconURL())
            .setTimestamp();

   sChannel = interaction.guild.channels.cache.get(channel)
        if (!sChannel) return;
        sChannel.send({embeds: [ embeds1 ]})      
    }   
    } catch (err) {
      console.log(`Error => `, err);
    }
  },
};