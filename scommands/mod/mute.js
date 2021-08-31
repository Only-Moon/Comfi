const { Interaction, MessageEmbed } = require("discord.js");

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
      type: 4,
      required: false,
    },
    {
      name: "reason",
      description: "Reason To Mute",
      type: 3,
      required: false,
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
      const options = interaction.options._hoistedOptions;

      const user = options.find((e) => e.name === "user");
      const time = options.find((e) => e.name === "time");
      const reason = options.find((e) => e.name === "reason")?.value || `Muted by ${interaction.member.displayName}`;

      const embed = new MessageEmbed().setColor("GREEN");

      let MutedRole = interaction.guild.roles.cache.find((r) => r.name === "Muted");

      if (!MutedRole) {
        const role = await interaction.guild.roles.create({ name: "Muted" });

        interaction.guild.channels.cache.map((x) => {
          if (!x.isThread()) {
            x.permissionOverwrites.edit(
              role,
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
              },
              reason,
            );
          }

          MutedRole = role;
        });
      }

      if (user.member.roles.cache.find((e) => e.name === "Muted")) {
        embed.setColor("RED").setDescription(`:x: User Already Muted`);
        return await interaction.editReply({ embeds: [embed] });
      }
      await user.member.roles.add(MutedRole);
      embed.setDescription(`:white_check_mark: ${user.member.toString()} ***Muted Successfully***`);
      await interaction.editReply({ embeds: [embed] });

let muted = new MessageEmbed()
  .setDescription(`You have Been Muted by ${interaction.member.displayName} \n **Reason:** ${reason}`)
  .setColor("#F4B3CA");
      
 await user.member.send({embeds: [ muted ]})
      
      // for timed mute
      if (time) {
        setTimeout(async () => {
          await user.member.roles.remove(MutedRole);
        }, time.value * 60 * 1000)
  await user.member.send("You have been Unmuted from the server"); 
 }

let channel = await db.fetch(`modlog_${interaction.guild.id}`)
            if (!channel) return;

            let embeds1 = new MessageEmbed()
                .setColor('RED')
                .setThumbnail(user.member.avatarURL({ dynamic: true }))
                .setAuthor(`${interaction.guild.name} Modlogs`, interaction.guild.iconURL())
                .addField("**Moderation**", "mute")
                .addField("**Mutee**", user.member.username)
                .addField("**Moderator**", interaction.member.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", interaction.createdAt.toLocaleString())
                .setFooter(interaction.member.displayName, interaction.member.avatarURL())
                .setTimestamp()

            var sChannel =  interaction.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({embeds: [ embeds1 ]})

    } catch (err) {
      console.log("Error => ", err);
    }
  },
};