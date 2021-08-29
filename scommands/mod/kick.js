const { Interaction, MessageEmbed } = require("discord.js");
const { db } = require('../../Database.js');

module.exports = {
  name: "kick",
  description: "Kick Someone",
  type: "CHAT_INPUT",
  options: [
    {
      name: "user",
      description: "User To Kick",
      type: 6,
      required: true,
    },
    {
      name: "reason",
      description: "Reason To Kick",
      type: 3,
      required: false,
    },
  ],
  userperm: ["KICK_MEMBERS"],
  botperm: ["KICK_MEMBERS"],
  /**
   *
   * @param {Interaction} interaction
   */
  run: async (bot, interaction, args) => {
    try {
      // NOW lets get the user from options
      const options = interaction.options._hoistedOptions;

      const user = options.find((e) => e.name === "user");
      const reason = options.find((e) => e.name === "reason") || `Kicked by ${interaction.member.displayName}`;
      
			var kickMember =
interaction.guild.members.cache.get(args[0]) || user
			
      const userRank = user.member.roles.highest.rawPosition; const memberRank = interaction.member.roles.highest.rawPosition; 
      
if (!kickMember)
				return interaction.editReply('**User Is Not In The Guild!**');

			if (kickMember === interaction.member)
				return interaction.editReply('**You Cannot Kick Yourself!**');
				   if (userRank >= memberRank) {
            return interaction.editReply(":x: | **You can\'t kick this member due to your role being lower than that member role.**")
        }

			if (kickMember.kickable) {
				const sembed2 = new MessageEmbed()
					.setColor('RED')
					.setDescription(
						`**You Have Been Kicked From ${interaction.guild.name} for - ${reason ||
							'No Reason!'}**`
					)
					.setFooter(interaction.guild.name, interaction.guild.iconURL());
			kickMember.send({ embed: [ sembed2 ]})	
				kickMember.kick();
			} else {
			  return interaction.editReply(":x: | **I can\'t kick this user make sure that the users role is lower than my role.**");
			}
			if (reason) {
				var sembed = new MessageEmbed()
					.setColor('GREEN')
					.setDescription(
						`**${kickMember.user.username}** has been kicked for ${reason}`
					);
				interaction.editReply({embeds: [ sembed ]});
			} else {
				var sembed2 = new MessageEmbed()
					.setColor('GREEN')
					.setDescription(`**${kickMember.user.username}** has been kicked`);
				interaction.editReply({embeds: [ sembed2 ]});
			}
			let channel = await db.fetch(`modlog_${interaction.guild.id}`);
			if (!channel) return;

			const embed = new MessageEmbed()
				.setAuthor(`${interaction.guild.name} Modlogs`, interaction.guild.iconURL())
				.setColor('#ff0000')
				.setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
				.setFooter(interaction.guild.name, interaction.guild.iconURL())
				.addField('**Moderation**', 'kick')
				.addField('**User Kicked**', kickMember.user.username.toString())
				.addField('**Kicked By**', interaction.user.username)
				.addField('**Reason**', `${reason || '**No Reason**'}`)
				.addField('**Date**', interaction.createdAt.toString())
				.setTimestamp();

			var sChannel = interaction.guild.channels.cache.get(channel);
			if (!sChannel) return;
			sChannel.send({embeds: [ embed ]});
		} catch (e) {
			return interaction.channel.send(`**${e.message}**`);
		}
	}
};
