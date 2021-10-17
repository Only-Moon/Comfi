const {MessageActionRow, MessageButton, CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "moderate",
    description: "Moderate a User",
    ownerOnly: false,
    options: [
        {
            type: 'USER',
            description: 'User to moderate',
            name: 'user',
            required: true,
        },
        {
            type: 'STRING',
            description: 'Reason for moderate',
            name: 'reason',
            required: false,
        },
    ],
    userperm: ["KICK_MEMBERS,  BAN_MEMBERS"],
    botperm: ["KICK_MEMBERS,  BAN_MEMBERS"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
      
        const member = interaction.options.getMember('user') || interaction.guild.members.cache.get(args[0]);
        if (!member) return interaction.editReply(`${bot.error} Please mention a valid user to moderate`)

        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.editReply(`${bot.error} You cannot moderate this user because they are higher than you.`)
        if (member.roles.highest.position >= interaction.guild.me.roles.highest.position) return interaction.editReply(`${bot.error} I cannot moderate this user because they are higher than me.`)
        if (member.id === interaction.member.id) return interaction.editReply(`${bot.error} You cannot moderate yourself.`)
        if (member.id === interaction.guild.me.id) return interaction.editReply(`${bot.error} I cannot moderate myself.`)
        let reason = args.slice(1).join(' ') || 'no reason'

        const kButton = new MessageButton().setCustomId('kick').setLabel('Kick').setStyle('DANGER')
        const banButton = new MessageButton().setCustomId('ban').setLabel('Ban').setStyle('DANGER')

        let row = new MessageActionRow().addComponents(kButton, banButton)
        const collector = interaction.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 30000})
        interaction.editReply({content: 'Select an action to perform.', components: [row]})

        collector.on('collect', async (m) => {
            if (m.customId === 'kick') {
                member.kick({reason: reason || 'No Reason Specified.'})
                member.send({content: `You have been Kicked from **${interaction.guild.name}** \nReason: **${reason}**`})
kButton.setDisabled(true)
                banButton.setDisabled(true)
                row = new MessageActionRow().addComponents(kButton, banButton)
                m.update({content: `${member.user.tag} has been kicked for ${reason}`, components: [row]})
            }
            if (m.customId === 'ban') {
                member.ban({reason: reason || 'No reason specified.'})
                member.send({content: `You have been Banned from **${interaction.guild.name}** \nReason: **${reason}**`})
                kButton.setDisabled(true)
                banButton.setDisabled(true)
                row = new MessageActionRow().addComponents(kButton, banButton)
                m.update({content: `${member.user.tag} has been banned for ${reason}`, components: [row]})
            }
        })
    }
}
