const { MessageEmbed } = require('discord.js')
const { MessageButton } = require('discord-buttons')
const db = require('old-wio.db');

module.exports = {
    config: {
        name: "nk",
        aliases: ["sk", 'ick'],
        category: "mod",
        description: "Sets Or Changes Nickname Of An User",
        usage: "[mention | name | nickname | ID] <nickname>",
    },
    run: async (bot, message, args) => {
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()) || message.member;
        if (!member) return message.channel.send("**Please Enter A Username!**");

        if (member.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send('**Cannot Set or Change Nickname Of This User!**')
        
    const name = args.join(' ') // For NickName
    if (!name) return message.reply(`What NickName You Do Want To Keep?`) // If No NickName Provided

    if (name.length > 32) return message.reply(`Your Name Can't Be Longer Than 32 Words`) // If Name Is Longer Then 32 Words // Discord Rules
    if (name.length < 2) return message.reply(`You Name Can't Be Shorter Than 2 Words`) // If Name Is Shorter Then 2 Words

    const embed1 = new MessageEmbed()
      .setAuthor(member.user.username, member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setColor('RANDOM')
      .setDescription(`
<@${member.user.id}> Wants To Change NickName To **${name}**

React Below WithIn 30 Seconds
            `)

    const button1 = new MessageButton()
      .setStyle('green') // Color Of Button
      .setID('yes') // ID, So We Make Its Function
      .setLabel('Yes, Change') // Label Of Button

    const button2 = new MessageButton()
      .setStyle('red') // Color Of Button
      .setID('no') // ID, So We Make Its Function
      .setLabel('No, Don\'t Change') // Label Of Button

    message.channel.send({ buttons: [button1, button2], embed: embed1 }).then(message => { // Send Embed And Buttons
      const filter = (button) => button.clicker.user.id === member.id // To Check If User Who Clicked Button Is Same As Who Used Command
      const collector = message.createButtonCollector(filter, { time: 30000 }) // 30 Seconds To Click

      collector.on('collect', async b => {
        b.defer()
        if (b.id === 'yes') { // If User Click Yes Button
          member.setNickname(name)
          b.channel.send(`Successfully Chnaged NickName To **${name}**`)
          collector.stop()
        } else if (b.id === 'no') { // If User Click No Button
          b.channel.send(`Request Cancelled`)
          collector.stop()
        }
      })
    })

        let channel = db.fetch(`modlog_${message.guild.id}`)
        if (!channel) return;

        const sembed = new MessageEmbed()
            .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
            .setColor("#ff0000")
            .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
            .setFooter(message.guild.name, message.guild.iconURL())
            .addField("**Moderation**", "setnick")
            .addField("**Nick Changed Of**", member.user.username)
            .addField("**Nick Changed By**", message.author.username)
            .addField("**Nick Changed To**", args[1])
            .addField("**Date**", message.createdAt.toLocaleString())
            .setTimestamp();

            var sChannel = message.guild.channels.cache.get(channel)
            if (!sChannel) return;
            sChannel.send(sembed)
    }
}