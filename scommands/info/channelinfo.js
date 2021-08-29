const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "channelinfo",
    description: "Shows Informations About Mentioned Channel",
  options: [
        {
            type: 'CHANNEL',
            description: 'Channel to get info about',
            name: 'channel',
            required: false,
        },
    ],
   
run: async (bot, interaction, args) => {
        let channel = bot.guilds.cache.get(interaction.guild.id).channels.cache.get(args[0]) || interaction.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || interaction.channel;
        if (!channel) return message.channel.send("**Channel Not Found!**");

        let embed = new MessageEmbed()
            .setTitle(`Channel Information for ${channel.name}`)
            .setThumbnail(interaction.guild.iconURL())
            .addField("**NSFW**", ` \`\`\`\ ${channel.nsfw} \`\`\`\ `)
            .addField("**Channel ID**", ` \`\`\`\ ${channel.id} \`\`\`\ `)
            .addField("**Channel Type**", ` \`\`\`\ ${channel.type} \`\`\`\ `)
            .addField("**Channel Description**", ` \`\`\`\ ${channel.topic || "No Description"} \`\`\`\ `)
            .addField("**Channel Created At**", ` \`\`\`\ ${channel.createdAt} \`\`\`\ `)
            .setColor("#F4B3CA")
        interaction.editReply({embeds: [ embed ]});
    }
}