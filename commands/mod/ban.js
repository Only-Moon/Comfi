const { Interaction, MessageEmbed } = require("discord.js");
const { db } = require('../../Database.js');

module.exports = {
  name: "ban",
  description: "Ban Someone",
  type: "CHAT_INPUT",
  // lets create options here
  options: [
    {
      name: "user",
      description: "User To Ban",
      type: 6,
      required: true,
    },
    {
      name: "reason",
      description: "Reason To Ban",
      type: 3,
      required: true,
    },
  ],
  userperm: ["BAN_MEMBERS"],
  botperm: ["BAN_MEMBERS"],
  /**
   *
   * @param {Interaction} interaction
   */
  run: async (bot, interaction, args) => {
    try {
      // NOW lets get the user from options
      const options = interaction.options._hoistedOptions;

      const user = options.find((e) => e.name === "user");
      const reason = options.find((e) => e.name === "reason").value || `Banned by ${interaction.member.username}`;
        


            let banMember = interaction.guild.members.cache.get(args[0]) || user
;
          if (!banMember) return interaction.channel.send("**Please Provide A User To Ban!**")
            if (!banMember) return interaction.editReply("**User Is Not In The Guild**");
            if (banMember === interaction.member) return interaction.editReply("**You Cannot Ban Yourself**")

            if (!banMember.bannable) return interaction.editReply("**Cant Ban That User**")
            try {
            interaction.guild.members.ban(banMember)
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
            let channel = await db.fetch(`modlog_${interaction.guild.id}`)
            if (channel == null) return;

            if (!channel) return;

            const embed = new MessageEmbed()
                .setAuthor(`${interaction.guild.name} Modlogs`, interaction.guild.iconURL())
                .setColor("#F4B3CA")
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
        } catch (e) {
            return interaction.channel.send(`**${e.message}**`)
        }
    
    },
}