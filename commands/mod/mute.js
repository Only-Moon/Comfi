const { CommandInteraction, MessageEmbed } = require("discord.js");
const guilds = require('../../models/guild');

module.exports = {
      name: "mutee",
      description: "Mute or Unmute a User",
      ownerOnly: false,
      options: [
    {
          name: "add",
          description: "Mute Someone",
          type: "SUB_COMMAND",
          options: [
    {
          name: "user",
          description: "User To Mute",
          type: 6,
          required: true,
    },
    {
         name: "time",
         description: "Time Till Mute in Minutes",
         type: 'STRING',
         required: false,
    },
    {
         name: "reason",
         description: "Reason To Mute",
         type: 3,
         required: false,
    },
  ],
     },
     {
        name: "remove",
        description: "Unmute Someone",
        type: "SUB_COMMAND",
        options: [
    {
        name: "user",
        description: "User To Unmute",
        type: 6,
        required: true,
    },
  ],
     }
     ],
  userperm: ["MUTED_MEMBERS"],
  botperm: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  run: async (bot, interaction, args) => {
       
 let [ sub ] = args
 
 let guild = await guilds.findOne({guildId: interaction.guild.id})
       
if (sub === "add") {   
       
       var mutee = interaction.options.getMember('user');
      var time = interaction.options.getString('time');
      if (mutee === interaction.member) return interaction.editReply(`${bot.error} • **You Cannot Mute Yourself!**`)
        if (mutee.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0) return interaction.editReply(` ${bot.error} • **Cannot Mute This User!**`)
          let reason = args.slice(1).join(" ") || interaction.options.getString('reason'); 
      if (mutee.user.bot) return interaction.editReply(`${bot.error} • **Cannot Mute Bots!**`); 

const guild = await guilds.findOne({guildId: interaction.guild.id})
    if(!guild.muterole) return;

    if(guild.muterole) {
      
  const userRoles = mutee.roles.cache .filter(r => r.id !== interaction.guild.id) .map(r => r.id) 
  let muterole; 
      let dbmute = guild.muterole
      let muteerole = interaction.guild.roles.cache.find(r => r.name === "muted")
        if (!interaction.guild.roles.cache.has(dbmute)) { 
          muterole = muteerole
        } else { 
          muterole = interaction.guild.roles.cache.get(dbmute) 
        } 
      if (!muterole) { 
        try { 
          muterole = await interaction.guild.roles.create({ name: "muted" }) 
            interaction.guild.channels.cache.forEach(async (channel) => { await channel.permissionOverwrites.edit(
              muterole,
              {
                MANAGE_WEBHOOKS: false,
                SEND_MESSAGES: false,
                USE_PUBLIC_THREADS: false,
                USE_PRIVATE_THREADS: false,
                ADD_REACTIONS: false,
                ATTACH_FILES: false,
                SEND_TTS_MESSAGES: false,
                MANAGE_THREADS: false,
                MANAGE_MESSAGES: false,
                MENTION_EVERYONE: false,
                CONNECT: false,
                SPEAK: false,
              })
        })
     } catch (err) {

return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`)
        } 
      };
      if (mutee.roles.cache.has(muterole.id)) return interaction.editReply(`${bot.error} • **User Is Already Muted!**`) 
      await guilds.findOneAndUpdate({guildId: interaction.guild.id}, {
                  muted_role: userRoles,
                  })
          try { mutee.roles.set([muterole.id]).then(() => { 
            mutee.send(`**Hello, You Have Been Muted In ${interaction.guild.name} for - ${reason || "No Reason"}**`).catch(() => null)
          })
          } catch { 
            mutee.roles.set([muterole.id]) 
          } 
      if (reason) { 
        
        const sembed = new MessageEmbed() 
          .setColor(bot.color) 
          .setAuthor(interaction.guild.name, interaction.guild.iconURL()) 
          .setDescription(`${mutee.user.username} was successfully muted for ${reason}`) 
          
        interaction.editReply({embeds: [ sembed ]});
      } else { 
        
  const sembed2 = new MessageEmbed() 
    .setColor(bot.color) 
    .setDescription(`${mutee.user.username} was successfully muted`) ;
interaction.editReply({embeds: [ sembed2 ]}); 
    } 

   // for timed mute
      if (time) {
        setTimeout(async () => {
          await user.member.roles.remove(MutedRole);
        }, time.value * 60 * 1000)
  await mutee.send("You have been Unmuted from the server"); 
 }

    if(!guild.modlog) return;

    if(guild.modlog) {
            let channel = interaction.guild.channels.cache.find(c => c.id === guild.mod_channel)
                if (!channel) return;

            let embeds1 = new MessageEmbed()
                .setColor(bot.color)
                .setThumbnail(interaction.user.avatarURL({ dynamic: true }))
                .setAuthor(`${interaction.guild.name} Modlogs`, interaction.guild.iconURL())
                .addField("**Moderation**", "mute")
                .addField("**Mutee**", mutee.user.username.toString())
                .addField("**Moderator**", interaction.user.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", interaction.createdAt.toLocaleString())
                .setFooter(interaction.guild.name, interaction.guild.iconURL())
                .setTimestamp();

            var sChannel =  interaction.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({embeds: [ embeds1 ]})
    }
  }
  
}

if (sub === "remove") {
  
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

return interaction.editReply(`${bot.error} An error has occured. \nError: ${err} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`)
    }
  
}

}}