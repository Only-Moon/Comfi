const Discord = require('discord.js');
const config = require('../../config.json');
const beautify = require('beautify');

module.exports = {
  config: {
    name: "eval", 
    aliases: ["e", "evaluate"],
    category: "owner",
    description: "Evaluates the code you put in but it's only available for the my Developer and no one else!!!!!",
    example: `${config.PREFIX} eval [js string]`,
    ownerOnly: true,
  },

    run: async (bot, message, args) => { 

      for(let i = 0; i < config.owners.length; i++) {
        if(!message.author.id == config.owners[i]) return
      }
        
        if (!args[0]) {
            return;
        }

            if (args.join(" ").toLowerCase().includes("token")) {
                return message.reply("Are you crazy ;-; You are going to give out your token public. I stopped it hopefully...")
            }
        
            const toEval = args.join(" ");
            await eval(toEval)
            //const evaluated = eval(toEval); 

            /*let embed = new Discord.MessageEmbed()
            .setColor("#00FF00")
            .setTimestamp()
            .setFooter(bot.user.username)
            .setTitle("Eval")
            .addField("To Evaluate", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
            .addField("Evaluated:", `\`\`\`${evaluated || "??"}\`\`\``)
            .addField("Type of:", `\`\`\`${typeof(evaluated) || "?"}\`\`\``);

            message.channel.send({embeds: [ embed ]});*/

    }

}