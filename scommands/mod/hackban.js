const { db } = require('../../Database.js');
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
                interaction.guild.members.ban(target, {reason: reason.length < 1 ? 'No reason supplied.': reason});
                const embed2 = new MessageEmbed()
                .setColor("GREEN")
                .setDescription("**They were successfully banned. User was not notified!**");
                await interaction.editReply({embeds: [ embed2 ]});                
                const channel  = db.fetch(`modlog_${interaction.guild.id}`);
                if (!channel) return;
            const embed = new MessageEmbed()
                .setAuthor(`${interaction.guild.name} Modlogs`, interaction.guild.iconURL())
            .setColor("#F4B3CA")
                .setFooter(interaction.guild.name, interaction.guild.iconURL())
                .addField("**Moderation**", "ban")
                .addField("**ID**", `${target}`)
                .addField("**Banned By**", interaction.member.username)
                .addField("**Reason**", `${reason || "**No Reason**"}`)
                .addField("**Date**", interaction.createdAt.toLocaleString())
                .setTimestamp();
  
            var sChannel = interaction.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send({embeds: [ embed ]})
            
            } catch (error) { console.log(error)}
    }
}