const beautify = require('beautify');
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "eval",
    description: "Evaluates the code you put in but it's only available for the my Developer and no one else!!!!!",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'Code to evaluate',
            name: 'code',
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
/**
      for(let i = 0; i < config.owners.length; i++) {
        if(!message.author.id == config.owners[i]) return
      }
        
        if (!args[0]) {
            return;
        }
*/
            if (args.join(" ").toLowerCase().includes("token")) {
                return interaction.editReply("Are you crazy ;-; You are going to give out your token public. I stopped it hopefully...")
            }
        
            const toEval = args.join(" ");
            //await eval(toEval)
            const evaluated = eval(toEval); 

            let embed = new MessageEmbed()
            .setColor("#F4B3CA")
            .setTimestamp()
            .setFooter(bot.user.username)
            .setTitle("Eval")
            .addField("To Evaluate", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
            .addField("Evaluated:", `\`\`\`${evaluated || "??"}\`\`\``)
            .addField("Type of:", `\`\`\`${typeof(evaluated) || "?"}\`\`\``);

            interaction.editReply({embeds: [ embed ]});

    }

}