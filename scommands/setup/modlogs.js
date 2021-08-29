const { CommandInteraction, MessageEmbed } = require("discord.js");
const { db } = require('../../Database.js');
                                        
module.exports = {
    name: "modlogs",
    description: "Sets a Channel Where Bot Can Send Moderation logs!",
    ownerOnly: false,
    options: [
        {
            type: 'CHANNEL',
            description: 'modlogs channel',
            name: 'channel',
            required: true,
        },
    ],
    userperm: ["ADMINISTRATOR"],
    botperm: ["MANAGE_SERVER"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

    if (!args[0]) {
      let b = await db.fetch(`modlog_${interaction.guild.id}`);
      let channelName = interaction.guild.channels.cache.get(b);
      if (interaction.guild.channels.cache.has(b)) {
        return interaction.editReply(
          `**Modlog Channel Set In This Server Is \`${channelName.name}\`!**`
        );
      } else
        return interaction.editReply(
          "**Please Enter A Channel Name or ID To Set!**"
        );
    }
        let channel = bot.guilds.cache.get(interaction.guild.id).channels.cache.get(args[0]) || interaction.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLocaleLowerCase());

        if (!channel || channel.type !== 'GUILD_TEXT') return interaction.editReply("**Please Enter A Valid Text Channel!**");

        try {
            let a = await db.fetch(`modlog_${interaction.guild.id}`)

            if (channel.id === a) {
                return interaction.editReply("**This Channel is Already Set As Modlog Channel!**")
            } else {
                bot.guilds.cache.get(interaction.guild.id).channels.cache.get(channel.id).send("**Modlog Channel Set!**")
                await db.set(`modlog_${interaction.guild.id}`, channel.id)

                interaction.editReply(`**Modlog Channel Has Been Set Successfully in \`${channel.name}\`!**`)
            }
        } catch {
            return interaction.editReply("**Error - `Missing Permissions Or Channel Is Not A Text Channel!`**");
        }
    }
};