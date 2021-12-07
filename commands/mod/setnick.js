const { Interaction, MessageEmbed } = require("discord.js");
const guilds = require('../../models/guild');

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
    userperm: ["MANAGAE_NICKNAMES"],
    botperm: ["MANAGAE_NICKNAMES"],
  /**
   *
   * @param {Interaction} interaction
   */
  run: async (bot, interaction, args) => {
    try {

      // now extract values
      const user = interaction.options.getUser("user") || interaction.guild.members.cache.get(args[0]);
      const nickname = interaction.options.getString("nickname");
      const embed = new MessageEmbed().setColor(bot.color)

      if (!user.member.manageable && user.member.id !== bot.user.id) {
        embed.setDescription(`${bot.error} • I Cant Change ${user.member.toString()}'s Nickname`)
        return interaction.editReply({embeds: [embed]})
      }

      const oldNick = user.member.nickname ? user.member.nickname : user.member.user.username;

      await user.member.setNickname(nickname.value);

      embed.setDescription(`${bot.tick} • ${user.member.toString()}'s Nickname Changed`).setFooter(`From ${oldNick} to ${nickname.value}`);
      
await interaction.editReply({ embeds: [embed] }).catch(() => null);

                const guild = await guilds.findOne({guildId: interaction.guild.id})
    if(!guild.modlog) return;

    if(guild.modlog) {
            let channel = interaction.guild.channels.cache.find(c => c.id === guild.mod_channel)
                if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${interaction.guild.name} Modlogs`, interaction.guild.iconURL({ dynamic: true }))
            .setColor(bot.color)
            .setThumbnail(user.user.avatarURL({ dynamic: true }))
            .setFooter(interaction.guild.name, interaction.guild.iconURL())
            .addField("**Moderation**", "setnick")
            .addField("**Nick Changed Of**", user.user.username.toString())
            .addField("**Nick Changed By**", interaction.user.username.toString())
            .addField("**Nick Changed To**", args[1].toString())
            .addField("**Date**", interaction.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = interaction.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({embeds: [ sembed ]})
    }
    } catch (err) {
      return interaction.channel.send({content: `${bot.error} **Something Went Wrong =>** \n${err} \n [Contact Support](https://comfi.xx-mohit-xx.repl.co/discord)`});
    } 
  },
};
