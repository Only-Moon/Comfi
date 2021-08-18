const {
    MessageEmbed,
    Message
} = require("discord.js");
const {
    readdirSync
} = require("fs");
const prefix = require("../../config.json").prefix;
let color = "#36393f";
const {
    button_pagination
} = require('djs-helper-v13');

module.exports = {
config: {
    name: "hpp",
    description: "Help Menu",
    category: 'utility',
    usage: "1) !help \n2) !help [module name]\n3) !help [command (name or alias)]",
    example: "1) !help\n2) !help util\n3) !help ban",
    aliases: ['h2']
},
run: async (bot, message, args) => {


        let cots = [];

        if (!args[0]) {

            //categories to ignore
            let ignored = [
                "owner"
            ];

            const emo = {
                admin: "<a:bun_bounce_HE:798617643775033394>",
    emoji: "<a:llama_roll_HE:855602231986487326>",
    economy: "<:currency_HE:812034164891189289>",
    fun: "<a:730643342169210890:798458300219785216>",
    images: "<a:pinktea_HE:796373339651571744>",
    info: "<a:Pink_Bow_HE:783028553897869332>",
    mod: "<a:heartcharm_HE:783028559580495923>",
    music: "<a:cat_tada_HE:779274421574959127>",
    utility: "<a:paw_HE:797027740007661578>"
};

            readdirSync("./commands/").forEach((dir) => {
                if (ignored.includes(dir.toLowerCase())) return;
                const commands = readdirSync(`./commands/${dir}/`).filter((file) =>
                    file.endsWith(".js")
                );


                const cmds = commands.map((command) => {
                    let file = require(`../commands/${dir}/${command}`);

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
                    .setDescription(`Use \`${prefix}help\` followed by a command name to get more information on a command.\nFor example: \`${prefix}help ping\`.\n\n`)
                    .setColor(color)

                cot.cmdo.forEach(cmodo => {
                    embed.addFields(cmodo)
                })

                embeds.push(embed);
            });

            await button_pagination(bot, message, embeds)

        } else {

            const command =
                bot.commands.get(args[0].toLowerCase()) ||
                bot.commands.find(
                    (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
                );


            if (!command) {
                const embed = new MessageEmbed()
                    .setTitle(`Invalid command! Use \`${prefix}help\` for all of my commands!`)
                    .setColor("RED");
                return await bot.sendEmbed({embeds: [ embed ]});
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
                    `\`${prefix}${command.name} ${command.usage}\`` :
                    `\`${prefix}${command.name}\``
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
            return await bot.sendEmbed({embeds: [ embed ]});
        }
    },
};