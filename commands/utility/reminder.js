const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  CommandInteraction,
} = require("discord.js");
const users = require("../../models/timer")

module.exports = {
	name: 'reminder',
	description: 'Set a reminder',
	ownerOnly: false,
	options: [
		{
			name: 'set',
			description: 'set your reminder',
			type: 'SUB_COMMAND',
      options: [
        {
          name: "duration",
          description: "duration for your remimder",
          required: true,
          type: "STRING"
        },
        {
          name: "reason",
          type: "STRING",
          description: "reason for making the reminder",
          required: true
        }  
        ],
		},
		{
			name: 'delete',
			description: 'delete your remimder',
			type: 'SUB_COMMAND',
			options: [
			  {
			    name: "id",
			    description: "id of the reminder to delete",
			    type: "STRING",
			    required: true
			  }
			  ],
		},
    {
      name: "list",
      description: "list of your reminders",
      type: "SUB_COMMAND",
			options: [
			  {
			    name: "user",
			    description: "user to check for reminder list",
			    type: "USER",
			    required: false
			  }
			  ],
    }
	],
	userperm: [''],
	botperm: ['SEND_MESSAGES'],

	/**
	 *
	 * @param {CommandInteraction} interaction
	 * @param {String[]} args
	 */
	run: async (bot, interaction, args) => {
    try {
const [subcmd] = args;

    let dmbtn = new MessageButton()
      .setCustomId("LOCATION_DM")
      .setLabel(`Dm`)
      .setStyle(`PRIMARY`)
      .setEmoji("🔔");

    let chbtn = new MessageButton()
      .setCustomId("LOCATION_CHANNEL")
      .setLabel(`Channel`)
      .setStyle(`PRIMARY`)
      .setEmoji("🔔");

    let delbtn = new MessageButton()
      .setCustomId("DELETE")
      .setStyle(`DANGER`)
      .setLabel("Cancel")
      .setEmoji(`🗑`);
    

   let locationRow = new MessageActionRow().addComponents(dmbtn, delbtn, chbtn)

    if (subcmd === "set") {

       const time = interaction.options.getString("duration");
       const reason = interaction.options.getString("reason");

    const wrongtime = new MessageEmbed()			
       .setColor(bot.color)			
        .setDescription(`${bot.error} • **Duration should end with d, m, h, or s.**`) 		
  
    if (			
      !time.endsWith('d') &&			
      !time.endsWith('m') &&			
      !time.endsWith('h') &&			
      !time.endsWith('s')		
    ) {		
      return await interaction.followUp({ embeds: [wrongtime] })
    }
      
      let duration = Math.floor(bot.ms(time) / 1000.0);

      let params = {
        userId: interaction.user.id,
        guildId: interaction.guild.id,
        remind_endsAt: Math.floor(new Date().getTime() / 1000.0) + duration,
        remind_channel: interaction.channel.id,
        remind_reason: reason,
        remind_duration: duration,
      };

      let sentMsg = await interaction.followUp({
        content: "Where should i notify you?",
        components: [locationRow],
      });

      let clctor = sentMsg.createMessageComponentCollector({
        time: 60000,
      });

      let disabledRow = new MessageActionRow().addComponents(
        dmbtn.setDisabled(true).setStyle(`SECONDARY`),
        chbtn.setDisabled(true).setStyle(`SECONDARY`)
      );

      clctor.on("collect", (i) => {
        const id = i.customId;
        
        if (i.user.id !== interaction.user.id)
          return i.reply({
            content: `${bot.error} • This button is not for you !!`,
            ephemeral: true,
          });

        if (id == "LOCATION_DM") {
          clctor.stop("dm");
        } else if (id == "LOCATION_CHANNEL") {
          clctor.stop("channel");
        } else if (id == "DELETE") {
          clctor.stop("delete")
        } else return;
      });

      clctor.on("end", async (i, reason) => {
        if (reason == "time") {
          sentMsg.edit({ components: [disabledRow] });
        } else if (reason == "delete") {
  
          await sentMsg.delete().catch(() => null)
          await interaction.channel.send({content: `${bot.tick} • Successfully Canceled the Reminder`}).then((msg) => {
  setTimeout(() => { if(msg.deletable) msg.delete() }, bot.ms('30s'))
  });
        } else {
          params.remind_location = reason;
          let create = await users.create(params);
          let embed = new MessageEmbed()
            .setTitle(`Reminder set!`)
            .setDescription(
              `I will remind you in **${
                reason == "dm" ? "your dms" : "this channel"
              }** for **\`${params.remind_reason}\`** in **${bot.ms(duration * 1000, {
                long: true,
              })}**!`
            )
            .setColor(bot.color)
            .setFooter({text: `Your reminder id: ${create?._id}`});
            if (create) {
            return sentMsg.edit({
              components: [],
              embeds: [embed],
              content: "**Your reminder**",
            });
          }
        }
  
      });
    }

    if (subcmd == "delete") {
      
      const id = interaction.options.getString("id")

     let timerID;
      try {
        timerID = await timerSchema.findOne({
          _id: id,
        });
      } catch (e) {
        return await interaction.editReply(`${bot.error} • That timer id doesnt exist !!`);
      }

      if (
        timerID &&
        timerID.remimd_userId !== interaction.user.id &&
        !interaction.member.permissions.has("ADMINISTRATOR")
      )
        return await interaction.followUp(`${bot.error} • This reminder isnt yours!`);
     let deleted = await users.findOneAndDelete({
       _id: id
     });
      if (deleted) {
        return await interaction.followUp(`${bot.tick} **• Deleted your reminder !!**`);
                   } else {
        return await interaction.followUp(`${bot.error} **• Thats not a valid reminder id !a**`);        
                   }
}

    if (subcmd == "list") {
      
      const user = interaction.options.getUser("user") || interaction.user
      
      let found = await users.find({
        userId: user.id
      });
      
      if (!found || found.length == 0) {
        return await interaction.editReply(`${bot.error} **• You have no active remimder!**`);
        
      } else if (found) {

    let desc = found.map((v, i) => {
        return `\`(#${i + 1})\` - **${v.remind_reason}** (<t:${
          v.remind_endsAt
        }:R>)\n**ID:** ${v._id}`;
      });
      let embed = new MessageEmbed()
        .setTitle(`**${user.username}'s Reminder:**`)
        setColor(bot.color )       .setDescription(`${desc.join("\n\n")}`);
        
      await interaction.followUp({ embeds: [embed] });
        
      } else return;
}
      
		} catch (e) {
				let emed = new MessageEmbed()
					.setTitle(`${bot.error} • Error Occured`)
					.setDescription(`\`\`\`${e.stack}\`\`\``)
					.setColor(bot.color)

				bot.sendhook(null, {
					channel: bot.err_chnl,
					embed: emed
				})

				interaction.followUp({
					embeds: [
						{
							description: `${
								bot.error
							} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
							color: bot.color
						}
					]
				})
			}
	}
}
