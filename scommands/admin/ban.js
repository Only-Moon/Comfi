const { Interaction, MessageEmbed } = require("discord.js");

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
      required: false,
    },
  ],
  userperm: ["BAN_MEMBERS"],
  botperm: ["BAN_MEMBERS"],
  /**
   *
   * @param {Interaction} interaction
   */
  run: async (bot, interaction) => {
    try {
      // NOW lets get the user from options
      const options = interaction.options._hoistedOptions;

      // now user cant use that command without providing a valid user so we dont even
      // need to handle wrong user or no args thing
      // which is a plus point with slash commands
      const user = options.find((e) => e.name === "user");
      const reason = options.find((e) => e.name === "reason").value || `Banned by ${interaction.member.displayName}`;

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
        embed.setDescription(`:x: You Cant Ban That User`);
        await interaction.editReply({ embeds: [embed] });
      } else if (!user.member.bannable) {
        embed.setDescription(`:x: I Cant Ban That User`);
        await interaction.editReply({ embeds: [embed] });
      } else {
        await user.member.ban({ reason });        
        embed.setColor("GREEN").setDescription(`:white_check_mark: User Banned Successfully`);
        await interaction.editReply({ embeds: [embed] });
      }

let ban = new MessageEmbed()
  .setDescription(`You have Been Banned by ${interaction.member.displayName} \n **Reason:** ${reason}`)
  .setColor("#F4B3CA");
      
 await user.member.send({embeds: [ ban ]})
      
      // now time to fix error xD
      // interaction.reply({ content: "Ban Command is Not Ready Yet", ephemeral: true });
    } catch (err) {
      console.log("Something Went Wrong => ", err);
    }
  },
};