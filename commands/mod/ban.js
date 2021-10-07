const { CommandInteraction, MessageEmbed } = require("discord.js");
const guilds = require('../../models/guild');  
const ms = require('ms');

module.exports = {
    name: "bann",
    description: "Different ways to ban a user",
    ownerOnly: false,
    options: [
        {
            name: "permanent",
           description: "Permanently Ban Someone from your Server",
           type: "SUB_COMMAND",
           options: [
        {
            name: "user",
            description: "User To Ban",
            type: "USER",
            required: true,
        },
        {
            name: "reason",
            description: "Reason To Ban",
            type: "STRING",
            required: true,
        },
  ],
        },
        {
             name: "temporary", 
             description: "Temporary Ban a User", 
             type: "SUB_COMMAND",
             options: [ 
       { 
            type: 'USER', 
            description: 'User to tempmute', 
            name: 'user', 
            required: true,
       },
       { 
          type: 'STRING', 
          description: 'Time till tempban', 
          name: 'time', 
          required: true,
       },
       { 
          type: 'STRING',
          description: 'Reason to tempban',
          name: 'reason',
          required: true, 
       },
  ],
        },
        {
           name: "hack",
           description: "Hack/forceban a user without them knowing it",
           type: "SUB_COMMAND", 
           options: [
        {
            type: 'USER',
            description: 'user to hackban',
            name: 'user',
            required: true,
        },
      {
            type: 'STRING',
            description: 'reason to hackban',
            name: 'reason',
            required: true,
        },
    ],
        },
        {
            name: "remove",
            description: "Unban Someone",
            type: "SUB_COMMAND",
            options: [
    {
            name: "user",
            description: "User To Unban",
            type: "STRING",
            required: true,
    },
  ],
        }
    ],
    userperm: ["BAN_MEMBERS"],
    botperm: ["BAN_MEMBERS"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
      
  let [ sub ] = args
 
 const guild = await guilds.findOne({guildId: interaction.guild.id})
      
  if (sub === "permanent") {
    
    try {

      const user = interaction.options.getUser("user")
      const reason = interaction.options.getString("reason") || `Banned by ${interaction.member.username}`;
        

            let banMember = interaction.guild.members.cache.get(args[0]) || user
;
          if (!banMember) return interaction.channel.send("**Please Provide A User To Ban!**")
            if (!banMember) return interaction.editReply("**User Is Not In The Guild**");
            if (banMember === interaction.member) return interaction.editReply("**You Cannot Ban Yourself**")

            if (!banMember.bannable) return interaction.editReply("**Cant Ban That User**")
            try {
            interaction.guild.members.ban(banMember, { reason: `${reason}`})
            banMember.send(`**Hello, You Have Been Banned From ${interaction.guild.name} for - ${reason || "No Reason"}**`).catch(() => null)
            } catch {         interaction.guild.members.ban(banMember )
            }
            if (reason) {
            var sembed = new MessageEmbed()
                .setColor("#F4B3CA")
                .setDescription(`**${banMember.user.username}** has been banned for ${reason}`)
            await interaction.editReply({embeds: [ sembed ]})
            } else {
                var sembed2 = new MessageEmbed()
                .setColor("#F4B3CA")
                .setDescription(`**${banMember.user.username}** has been banned`)
            await interaction.editReply({embeds: [ sembed2 ]})
            }

    if(!guild.modlog) return;
      
            let channel = interaction.guild.channels.cache.find(c => c.id === guild.mod_channel)
            if (channel == null) return;

            if (!channel) return;

if (guild.modlog) {
            const embed = new MessageEmbed()
                .setAuthor(`${interaction.guild.name} Modlogs`, interaction.guild.iconURL())
                .setColor(bot.color)
                .setThumbnail(banMember.user.displayAvatarURL({ dynamic: true }))
                .setFooter(interaction.guild.name, interaction.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**Banned**", banMember.user.username.toLocaleString())
                .addField("**ID**", `${banMember.id}`)
                .addField("**Banned By**", `${interaction.user.username}`)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", `${interaction.createdAt}`)
                .setTimestamp();

            var sChannel = interaction.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({embeds: [ embed ]})
}
        } catch (e) {
            return interaction.channel.send(`**${e.message}**`)
        }
 
  }
  
if (sub === "temporary") {
  
  const reason  = interaction.options.getString("reason")		
  
  const tbuser = interaction.options.getMember('user') || interaction.guild.members.cache.get(args[0]); 		
  const regex = interaction.options.getString("time")	 		
  if (tbuser === interaction.user.id) { 			
    return interaction.editReply(`${bot.error} Really!! Are you going to ban yourself..`); 	
  } 	
  
if(!reason) reason = "No Reason Provided"; 		 		
  const tbuembed = new MessageEmbed() 			
    .setTitle(" You have been banned!") 			
    .setColor(bot.color) 			
    .addField("Reason:", reason.toString()) 			
    .addField("Time (s)", regex.toString()) 			
    .addField("Moderator:", interaction.user.username); 		
  tbuser.send(tbuembed); 		
  
  const tbembed = new MessageEmbed() 			
    .setTitle("Action: Tempban") 			
    .addField("User:", tbuser.toString()) 			
    .setAuthor(`${interaction.user.username}`) 			
    .setColor(bot.color) 			
    .addField("Reason:", reason.toString()) 			
    .addField("Time (s)", regex.toString()) 			
    .addField("Moderator:", interaction.user.username); 		
  
  interaction.editReply({embeds: [ tbembed ]}); 		
  
  tbuser.send({embeds: [ tbuembed ]}).catch(() => null); 		 		
  
  interaction.guild.members.ban( tbuser, { reason: `${reason}`}).then(() => { 
    setTimeout( function (){ 		
      interaction.channel.send(`<@${tbuser.id} has been unbanned after tempban of ${regex}`); 		
    }, ms(regex)); 		
    return undefined; 	
  })
  
}

if (sub === "hack") {
  
  const target = interaction.options.getUser("user");
        if (isNaN(target)) return interaction.editReply(`${bot.error} • Please specify an ID or USERNAME`);

        const reason   = interaction.options.getString("reason");

            try {
                interaction.guild.members.ban(target, { reason: reason.length < 1 ? 'No reason supplied.': reason});
                const embed2 = new MessageEmbed()
                .setColor(bot.color)
                .setDescription("**They were successfully banned. User was not notified!**");
                await interaction.editReply({embeds: [ embed2 ]});
    if(!guild.modlog) return;

    if(guild.modlog) {
            let channel = interaction.guild.channels.cache.find(c => c.id === guild.mod_channel)
                if (!channel) return;
            const embed = new MessageEmbed()
                .setAuthor(`${interaction.guild.name} Modlogs`, interaction.guild.iconURL())
                .setColor(bot.color)
                .setFooter(interaction.guild.name, interaction.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**ID**", `${target}`)
                .addField("**Banned By**", interaction.user.username.toString())
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", interaction.createdAt.toString())
                .setTimestamp();
  
            var sChannel = interaction.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({embeds: [ embed ]})
    }     
            } catch (error) { console.log(`${error}`)
    }
  
}

if (sub === "remove") {
  
  try {

      const user = interaction.options.getString("user");

      // default embed
      const embed = new MessageEmbed().setColor("RED");

      const totalbans = await interaction.guild.bans.fetch()


      // we will match three conditions 1. id, 2. username, 3. tag
      const userToUnban = totalbans.find(x => x.user.id === user.value || x.user.username === user.value || x.user.tag === user.value)

      let userTag;
      if (!userToUnban) {
        embed.setDescription(`${bot.error} • Invalid User or User is Not Banned`)
        return interaction.editReply({embeds: [embed]})
      }

      userTag = userToUnban.user.tag || "User";

      await interaction.guild.bans.remove(userToUnban.user.id);

      embed.setColor(bot.color).setDescription(`${bot.tick} • Unbanned ${userTag} Successfully`)
      await interaction.editReply({embeds: [embed]})
    } catch (err) {
      console.log("Something Went Wrong => ", err);
    }
  
}
      
    }}