const bot = require("../../index");
const { MessageEmbed } = require('discord.js');
const guilds = require('../../models/guild')

bot.on("messageCreate", async (message) => {

 	if (message.author.bot || !message.guild || message.webhookID) return; 

    const guild = await guilds.findOne({guildId: message.guild.id})
  
  let disabled = new MessageEmbed()		
  .setTitle('Chatbot Error')
  .setColor(bot.color)		
  .setDescription('Chat Bot is disabled by the Owner in this Server!')		
  .setFooter(`Requested by ${message.author.username}`);

  if(guild.chatbot) {
let ch = guild.chat_channel
  
  if (!ch || ch === undefined) return;
  
  if(message.channel.id === ch) { 

let name = bot.user.username;
        let developer = "Moonbow and xxDeveloper";

        var ranges = [
          "\ud83c[\udf00-\udfff]", // U+1F300 to U+1F3FF
          "\ud83d[\udc00-\ude4f]", // U+1F400 to U+1F64F
          "\ud83d[\ude80-\udeff]" // U+1F680 to U+1F6FF
        ];

        let input = message.content.replace(
          new RegExp(ranges.join("|"), "g"),
          "."
        );

        const hasEmoteRegex = /<a?:.+:\d+>/gm;
        const emoteRegex = /<:.+:(\d+)>/gm;
        const animatedEmoteRegex = /<a:.+:(\d+)>/gm;

        const emoj = message.content.match(hasEmoteRegex);

        input = input.replace(emoteRegex.exec(emoj), "");

        input = input.replace(animatedEmoteRegex.exec(emoj), "");

      message.channel.sendTyping()

        fetch(
          `https://api.affiliateplus.xyz/api/chatbot?message=${input}&botname=${name}&ownername=${developer}&user=${message.author.id}`
        )
          .then((res) => {
            let rep = res.json();
            return rep;
          })
          .then(async (reply) => {
            let mes = await reply.message.replace("@everyone", "`@everyone`");
            let mess = mes.replace("@here", "`@here`");
      
      setTimeout(() => {
            message.reply({
              content: mess.toString(),
              allowedMentions: { repliedUser: false }
            });
          }, 60);
          })
          .catch((err) => message.reply({ content: `Error: ${err}` })); 
            } else { return; }

  } else if(!guild.chatbot && message.channel.id === guild.chat_channel) {
    return message.delete(), message.author.send({embeds: [ disabled ]})
  }
})