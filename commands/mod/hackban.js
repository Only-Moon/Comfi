const guilds = require('../../models/guild');
const { measureMemory } = require("vm");
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "hackban",
    description: "Hack/forceban a user",
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'user id to forceban',
            name: 'userid',
            required: true,
        },
      {
            type: 'STRING',
            description: 'reason to hackban',
            name: 'reason',
            required: true,
        },
    ],
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args, message) => {
        
        const target = args[0];
        if (isNaN(target)) return interaction.editReply(`Please specify an ID`);

        const reason   = args.splice(1, args.length).join(' ');

            try {
                interaction.guild.members.ban(target, { reason: reason.length < 1 ? 'No reason supplied.': reason});
                const embed2 = new MessageEmbed()
                .setColor("#F4B3CA")
                .setDescription("**They were successfully banned. User was not notified!**");
                await interaction.editReply({embeds: [ embed2 ]});                
                const guild = await guilds.findOne({guildId: interaction.guild.id})
    if(!guild.modlog) return;

    if(guild.modlog) {
            let channel = interaction.guild.channels.cache.find(c => c.id === guild.mod_channel)
                if (!channel) return;
            const embed = new MessageEmbed()
                .setAuthor(`${interaction.guild.name} Modlogs`, interaction.guild.iconURL())
            .setColor(bot.color)
                .setFooter(interaction.guild.name, interaction.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**ID**", `${target}`)
                .addField("**Banned By**", interaction.user.username.toString())
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", interaction.createdAt.toString())
                .setTimestamp();
  
            var sChannel = interaction.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({embeds: [ embed ]})
    }     
            } catch (error) { console.log(`${error}`)
    }
}}