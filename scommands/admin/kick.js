const { Interaction, MessageEmbed } = require("discord.js");

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
  run: async (bot, interaction) => {
    try {
      // NOW lets get the user from options
      const options = interaction.options._hoistedOptions;

      const user = options.find((e) => e.name === "user");
      const reason = options.find((e) => e.name === "reason").value || `Kicked by ${interaction.member.displayName}`;

      // default embed
      const embed = new MessageEmbed().setColor("RED");

      // we are going to do something special here
      const userRank = user.member.roles.highest.rawPosition;
      const memberRank = interaction.member.roles.highest.rawPosition;
      // but still we will make sure if user exists
      if (!user.member) {
        embed.setDescription(`:x: Cant Find That User`);
        await interaction.editReply({ embeds: [embed] });
      } else if (userRank >= memberRank) {
        embed.setDescription(`:x: You Cant Kick That User`);
        await interaction.editReply({ embeds: [embed] });
      } else if (!user.member.kickable) {
        embed.setDescription(`:x: I Cant Kick That User`);
        await interaction.editReply({ embeds: [embed] });
      } else {
        await user.member.kick({ reason });
        embed.setColor("GREEN").setDescription(`:white_check_mark: User Kicked Successfully`);
        await interaction.editReply({ embeds: [embed] });

let kick = new MessageEmbed()
  .setDescription(`You have Been Kicked by ${interaction.member.displayName} \n **Reason:** ${reason}`)
  .setColor("#F4B3CA");
      
 await user.member.send({embeds: [ kick ]})
        
      }
    } catch (err) {
      console.log("Something Went Wrong => ", err);
    }
  },
};