const { CommandInteraction, MessageEmbed, MessageAttachment } = require("discord.js");
const guilds = require("../../models/guild")
const users = require("../../models/users")
const rankCard = require("../../functions/RankCard")

module.exports = {
  name: "rank",
  directory: "level",
  description: "check your rank",
  ownerOnly: false,
  options: [
    {
      type: 'USER',
      description: 'user to check rank for',
      name: 'user',
      required: false,
    },
  ],
  userperm: [""],
  botperm: ["SEND_MESSAGES"],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {

    try {

      const target = interaction.options.getUser('user') || interaction.user;

      const guild = await guilds.findOne({ guildId: interaction.guild.id })

const lb = await users
  .find({guildId: interaction.guild.id})
  .sort([['xp', 'descending']]) 
  .exec() 
        
      const user = await users.findOne({ guildId: interaction.guild.id, userId: target.id })

      if (!user) {
        interaction.editReply(`${bot.error} User haven't Leveled Up yet or User is a Bot`)

      } else {
      
user.position = lb.findIndex((i) => 
  i.user === target.id)

        if (guild.leveling) {

          rankCard(bot, interaction, {
            slash: true,
            member: target,
            level: user.level,
            rank: Number(user.position) ? isNaN(user.position) : 0 + 1,
            color: bot.color,
            currentXP: user.xp,
            neededXP: user.requiredXp,
            background: "https://i.imgur.com/rkGiaIO.png"
          })
        } else {
          interaction.editReply(`${bot.error} Leveling is Disabled In this guild`)
        }
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
