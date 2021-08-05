const {
    MessageEmbed,
    Message
} = require("discord.js");
const {
    readdirSync
} = require("fs");
const PREFIX = require("../../config.js");
let color = "#36393f";
const simplydjs = require('simply-djs')


module.exports = {
config: {
    name: "h1",
    description: "Help Menu",
    category: 'utility',
    usage: "1) !help \n2) !help [module name]\n3) !help [command (name or alias)]",
    example: "1) !help\n2) !help util\n3) !help ban",
    aliases: ['hp1']
},
  /**
     * 
     * @param {Bot} bot 
     * @param {Message} message 
     * @param {String} args 
     * @returns 
     */
run: async (bot, message, args) => {


        let cots = [];

        if (!args[0]) {

            //categories to ignore
            let ignored = [
                "owner"
            ];

            const emo = {
                admin: "🎆",
                economy: "🎉",
                emoji: "📻",
                fun: "🔨",
                images: "🎌",
                info: ":comet:",
                mod: "🧨",
                music: "🔑",
                utility: "🎫",
            }

            readdirSync("./commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );


                const cmds = commands.map((command) => {
                    let file = require(`../../commands/${dir}/${command}`);

                    if (!file.name) return "No command name.";

                    let name = file.name.replace(".js", "");

                    let des = bot.commands.get(name).description;
                    let emoe = bot.commands.get(name).emoji;
                    let emoej = emoe ? `${emoe} - ` : ''


                    let obj = new Object();

                    obj = {
                        name: `${emoej}\`${name}\``,
                        value: des ? des : 'No Description',
                        inline: true
                    }

                    return obj;
                });


                let oby = {
                    dir,
                    cmdo: cmds
                }

                cots.push(oby);

            });

            let embeds = [];

            cots.forEach(cot => {

                cot.dir = cot.dir.replace(emo[cot.dir], '');

                const embed = new MessageEmbed()
                    .setTitle(`${cot.dir.charAt(0).toUpperCase() + cot.dir.slice(1)} Commands!`)
                    .setDescription(`Use \`${PREFIX}help\` followed by a command name to get more information on a command.\nFor example: \`${PREFIX}help ping\`.\n\n`)
                    .setColor(color)

                cot.cmdo.forEach(cmodo => {
                    embed.addFields(cmodo)
                })

                embeds.push(embed);
            });

 let pages = [ embeds ]         
simplydjs.embedPages(bot, message, pages)


        } else {

            const command =
                bot.commands.get(args[0].toLowerCase()) ||
                bot.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );


            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Invalid command! Use \`${PREFIX}help\` for all of my commands!`)
                    .setColor("RED");
                return await bot.sendEmbed(embed);
            }

            const embed = new MessageEmbed()
                .setTitle("Command Details:")
                .addField(
                    "Command:",
                    command.name ? `\`${command.name}\`` : "No name for this command."
                )
                .addField(
                    "Aliases:",
                    command.aliases ?
                    `\`${command.aliases.join("` `")}\`` :
                    "No aliases for this command."
                )
                .addField(
                    "Usage:",
                    command.usage ?
                    `\`${PREFIX}${command.name} ${command.usage}\`` :
                    `\`${PREFIX}${command.name}\``
                )
                .addField(
                    "Command Description:",
                    command.description ?
                    command.description :
                    "No description for this command."
                )
                .setFooter(
                    `Requested by ${message.author.tag}`,
                    message.author.displayAvatarURL({
                        dynamic: true
                    })
                )
                .setTimestamp()
                .setColor(color);
            return await bot.sendEmbed(embed);
        }
    },
};