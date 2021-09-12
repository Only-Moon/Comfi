const { Interaction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "unban",
  description: "Unban Someone",
  type: "CHAT_INPUT",
  // in unban we acnt give user as mention so we will make it a string so we can provide user id or user name
  options: [
    {
      name: "user",
      description: "User To Unban",
      type: "USER",
      required: true,
    },
  ],
  userperm: ["BAN_MEMBERS"],
  botperm: ["BAN_MEMBERS"],
  /**
   *
   * @param {Interaction} interaction
  **/
  run: async (bot, interaction) => {
    try {
      // unban command is going to be different than other so lets make :)
      const options = interaction.options._hoistedOptions;

      const user = options.find((e) => e.name === "user");

      // default embed
      const embed = new MessageEmbed().setColor("RED");


      const totalbans = await interaction.guild.bans.fetch()


      // we will match three conditions 1. id, 2. username, 3. tag
      const userToUnban = totalbans.find(x => x.user.id === user.value || x.user.username === user.value || x.user.tag === user.value)

      let userTag;
      if (!userToUnban) {
        embed.setDescription(`:x: Invalid User or User is Not Banned`)
        return await interaction.editReply({embeds: [embed]})
      }

      userTag = userToUnban.user.tag || "User";

      await interaction.guild.bans.remove(userToUnban.user.id);

      embed.setColor('GREEN').setDescription(`:white_check_mark: Unbanned ${userTag} Successfully`)
      await interaction.editReply({embeds: [embed]})
    } catch (err) {
      console.log("Something Went Wrong => ", err);
    }
  },
};