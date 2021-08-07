const { MessageEmbed, MessageButton } = require("discord.js");
const { create } = require("sourcebin");

module.exports = {
    config: {
        name: "sourcebin",
        category: 'utility',
        aliases: ["jsbin", "js", "bin"],
        description: "Get Link of your given Code or Text ad Hastebin",
        usage: "hastebin <code/text>",
    },
    run: async (bot, message, args) => {
     message.delete();
      
      const content = args.join(" ");
    if (!content)
      return message.lineReply(
        new MessageEmbed()
          .setDescription(
            "<:no_HE:778611410539905044> plese provide content to make a bin out of it!"
          )
          .setColor("#303136")
      );

    create(
      [
        {
          name: `Code by ${message.author.tag}`,
          content,
          language: "javascript",
        },
      ],
      {
        title: "Javascript code",
      }
    ).then((value) => {
  
   const embed = new MessageEmbed() . setDescription(`Click on the link below to Access Your Bin`
      )
      .setColor('RANDOM');
      
      let button = new MessageButton()
        .setStyle('LINK')
        .setURL(`${value.url}`) 
        .setLabel('Bin Url!'); 


message.channel.send({embeds: [ embed ],
    buttons: [button]
});
})
    }
  }
