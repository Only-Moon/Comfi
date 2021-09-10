const { Interaction, MessageEmbed } = require("discord.js");
const { db } = require('../../Database.js');

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
      if (!mutee) return interaction.editReply("<a:Attention:883349868062576701> **Please Enter A Valid User!**");
      let muterole; 
      let dbmute = await db.get(`muterole_${interaction.guild.id}`); 
      let muteerole = interaction.guild.roles.cache.find(r => r.name === "muted") 
        if (!interaction.guild.roles.cache.has(dbmute)) { 
          muterole = muteerole
        } else { 
          muterole = interaction.guild.roles.cache.get(dbmute) 
        } 
      
      let rolefetched = await db.get(`muteeid_${interaction.guild.id}_${mutee.id}`) 
        
      if (!rolefetched) return; 
      
      if (!muterole) return interaction.editReply("<a:Attention:883349868062576701> **There Is No Mute Role To Remove!**") 
      if (!mutee.roles.cache.has(muterole.id)) return interaction.editReply("<a:Attention:883349868062576701> **User is not Muted!**") 
        
      try { 
        mutee.roles.remove(muterole.id).then(() => { 
          mutee.send(`**Hello, You Have Been Unmuted In ${interaction.guild.name}**`).catch(() => null) 
            let roleadds = rolefetched
          console.log(roleadds)
              if (!roleadds) return; 
          mutee.roles.add([ roleadds ])
        }) 
      } catch { 
  let roleadds2 = rolefetched 
  if (!roleadds2) return; 
  mutee.roles.add([ roleadds2 ]) 
      
      } 
const sembed = new MessageEmbed() 
  .setColor("#F4B3CA")
  .setDescription(`${mutee.user.username} was successfully unmuted.`) 
        
interaction.editReply({embeds: [ sembed ]}); 

let channel = db.get(`modlog_${interaction.guild.id}`)
        if (!channel) return;

        let embeds1 = new MessageEmbed()
            .setColor("#F4B3CA")
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
    
    } catch (err) {
      console.log(`Error => `, err);
    }
  },
};