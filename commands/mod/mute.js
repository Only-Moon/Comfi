const { Interaction, MessageEmbed } = require("discord.js");
const { db } = require('../../Database.js');

module.exports = {
  name: "mute",
  description: "Mute Someone",
  type: "CHAT_INPUT",
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
  userperm: ["MUTED_MEMBERS"],
  botperm: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
  /**
   *
   * @param {Interaction} interaction
   */
  run: async (bot, interaction, args) => {
    try {
       var mutee = interaction.options.getMember('user');
      var time = interaction.options.getString('time');
      if (mutee === interaction.member) return interaction.editReply("<a:Attention:883349868062576701> **You Cannot Mute Yourself!**")
        if (mutee.roles.highest.comparePositionTo(interaction.guild.me.roles.highest) >= 0) return interaction.editReply('<a:Attention:883349868062576701> **Cannot Mute This User!**')
          let reason = args.slice(1).join(" ") || interaction.options.getString('reason'); 
      if (mutee.user.bot) return interaction.editReply("<a:Attention:883349868062576701> **Cannot Mute Bots!**"); 
      
  const userRoles = mutee.roles.cache .filter(r => r.id !== interaction.guild.id) .map(r => r.id) 
  let muterole; 
      let dbmute = await db.get(`muterole_${interaction.guild.id}`); 
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
        } catch (e) {
          console.log(e);
        } 
      };
      if (mutee.roles.cache.has(muterole.id)) return interaction.editReply("<a:Attention:883349868062576701> **User Is Already Muted!**") 
        await db.set(`muteeid_${interaction.guild.id}_${mutee.id}`, userRoles) 
          try { mutee.roles.set([muterole.id]).then(() => { 
            mutee.send(`**Hello, You Have Been Muted In ${interaction.guild.name} for - ${reason || "No Reason"}**`).catch(() => null)
          })
          } catch { 
            mutee.roles.set([muterole.id]) 
          } 
      if (reason) { 
        
        const sembed = new MessageEmbed() 
          .setColor("#F4B3CA") 
          .setAuthor(interaction.guild.name, interaction.guild.iconURL()) 
          .setDescription(`${mutee.user.username} was successfully muted for ${reason}`) 
          
        interaction.editReply({embeds: [ sembed ]});
      } else { 
        
  const sembed2 = new MessageEmbed() 
    .setColor("#F4B3CA") 
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

let channel = await db.get(`modlog_${interaction.guild.id}`)
            if (!channel) return;

            let embeds1 = new MessageEmbed()
                .setColor('#F4B3CA')
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

    } catch (err) {
      console.log("Error => ", err);
    }
  },
};