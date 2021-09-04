const { Interaction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "setnick",
  description: "Sets a Nickname to user",
  options: [
    {
      name: "user",
      description: "User to change nickname",
      type: 6,
      required: true,
    },
    {
      name: "nickname",
      description: "New nickname",
      type: 3,
      required: true,
    },
  ],
    userperm: ["MANAGE_SERVER"],
    botperm: ["MANAGE_SERVER"],
  /**
   *
   * @param {Interaction} interaction
   */
  run: async (bot, interaction) => {
    try {
      const args = interaction.options._hoistedOptions;

      // now extract values
      const user = args.find(x => x.name === "user");
      const nickname = args.find(x => x.name === "nickname");

      // create a default embed
      // red for error
      const embed = new MessageEmbed().setColor("RED")

      if(!message.member.permissions.has("MANAGAE_NICKNAMES")) return interaction.followUp("❌ You don't have enough permssions")

      // if dont have permission to manage user
      if (!user.member.manageable && user.member.id !== bot.user.id) {
        embed.setDescription(`:x: I Cant Change ${user.member.toString()}'s Nickname`)
        return interaction.editReply({embeds: [embed]})
      }

      const oldNick = user.member.nickname ? user.member.nickname : user.member.user.username;

      await user.member.setNickname(nickname.value);

      embed.setDescription(`:white_check_mark: ${user.member.toString()}'s Nickname Changed`).setFooter(`From ${oldNick} to ${nickname.value}`);
      await interaction.editReply({ embeds: [embed] });

   let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(user.member.displayAvatarURL({ dynamic: true }))
            .setFooter(interaction.guild.name, interaction.guild.iconURL())
            .addField("**Moderation**", "setnick")
            .addField("**Nick Changed Of**", user.member.username)
            .addField("**Nick Changed By**", interaction.member.username)
            .addField("**Nick Changed To**", args[1])
            .addField("**Date**", interaction.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = interaction.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({embeds: [ sembed ]})
      
    } catch (err) {
      console.log("Something Went Wrong => ", err);
    }
  },
};
