const Discord = require("discord.js")
const { CommandInteraction, MessageEmbed, MessageButton, MessageActionRow} = require("discord.js");

module.exports = {
    name: "emoji",
    description: "Enlargs an emoji for you",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'give me emote in :emoji: form',
            name: 'emote',
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
      const emo = Discord.Util.parseEmoji(args[0]);
    if (!emo.name || !emo.id) return interaction.editReply("Invalid emote argument");
    const res = `https://cdn.discordapp.com/emojis/${emo.id}.${emo.animated ? "gif" : "png"}`;
    
    let embed = new MessageEmbed()
      .setColor("F8B6D4")
      .setAuthor("Enlarged Emoji", interaction.user.avatarURL({ dynamic: true }))
      .setImage(`${res}`)
      .setDescription(`${emo.name} ${emo.id}`);

   const row = new MessageActionRow()
			.addComponents( new MessageButton()
        .setStyle('LINK')
        .setURL(`${res}`) 
        .setLabel('Emote Url!'), 
);
  
interaction.followUp({embeds: [ embed ],
    components: [row]
});
    
  }
      }