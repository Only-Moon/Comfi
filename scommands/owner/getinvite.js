const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
    name: "getinvite",
    description: "Generates an invitation to the server in question.",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: '[ID | name]',
            name: 'server',
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
    run: async (bot, interaction, args) => {
        let guild = null;

        if (!args[0]) return interaction.editReply("Enter An Name")

        if(args[0]){
            let fetched = bot.guilds.cache.find(g => g.name === args.join(" "));
            let found = bot.guilds.cache.get(args[0]);
            if(!found) {
                if(fetched) {
                    guild = fetched;
                }
            } else {
                guild = found
            }
        } else {
            return interaction.editReply("Invalid Name!");
        }
        if(guild){
            let tChannel = guild.channels.cache.find(ch => ch.type == "GUILD_TEXT" && ch.permissionsFor(ch.guild.me).has("CREATE_INSTANT_INVITE"));
            if(!tChannel) {
                return interaction.editReply("An Error Has Occured Try Again!"); 
            }
            let invite = await tChannel.createInvite({ temporary: false, maxAge: 0 }).catch(err => {
                return interaction.editReply(`${err} has occured!`);
            });
            interaction.editReply(invite.url);
        } else {
            return interaction.editReply(`\`${args.join(' ')}\` - Bot is Not in this server`);
        }
    }
    }
                                                     