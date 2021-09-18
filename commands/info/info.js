const { CommandInteraction, MessageEmbed } = require("discord.js");
const { version } = require('../../package.json');
const ms = require('pretty-ms');
const { version: discordjsVersion } = require('discord.js');
const moment = require('moment');
const { user } = require('../..');

module.exports = {
    name: "info",
    description: "Information",
    ownerOnly: false,
    options: [
        {
            type: 'SUB_COMMAND',
            description: `Check\'s bot\'s status`,
            name: 'bot',
        },
        {
            type: 'SUB_COMMAND',
            description: 'Information about the channel',
            name: 'channel',
            options: [
        {
            type: 'CHANNEL',
            description: 'Channel to get info about',
            name: 'name',
            required: false,
        },
    ],
        },
        {
            type: 'SUB_COMMAND',
            description: 'Information about the role',
            name: 'role',
            options: [
     {
     name: "role", 
     description:"The role you want information about", 
     type: "ROLE",
     required: true,
        },
    ],
        },
        {
            type: 'SUB_COMMAND',
            description: 'Information about the server',
            name: 'server',
        },
        {
            type: 'SUB_COMMAND',
            description: 'Information about the user',
            name: 'user',
            options: [
                {
                    type: 'USER',
                    name: 'user',
                    description: 'The specified user you\'d like to retrieve information for.',
                    required: false
                }
            ],
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
const [ subcommand ] = args
if (subcommand === 'bot') {

let embed = new MessageEmbed()
            .setColor(bot.color)
            .setAuthor(`${bot.user.username}™ v${version}`, bot.user.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL({ dynamic: true }))
            .addField('❯ Uptime :', `${ms(bot.uptime)}`, true)
            .addField('❯ WS Ping:', `${bot.ws.ping}ms`, true)
            .addField('❯ Memory:', `${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB Heap`, true)
            .addField('❯ Guild Count:', `${bot.guilds.cache.size} guilds`, true)
            .addField(`❯ User Count:`, `${bot.guilds.cache.reduce((users , value) => users + value.memberCount, 0)} users`, true)
            .addField('❯ Slash Commands:', `${bot.slashCommands.size} Commands`,true)
            .addField('❯ Text Commands:', `${bot.commands.size} Commands`,true)
            .addField('❯ Node:', `${process.version} on ${process.platform} ${process.arch}`, true)
            .addField('❯ Discord.js:', `v${discordjsVersion}`, true)
            .addField('❯ Credits:', '[Xx-Mohit-xX](https://github.com/Xx-Mohit-xX), [xxDeveloper](https://github.com/Murtatrxx) (Bot)', true) //\n [Vlad44](https://github.com/xVlad44), [xxDeveloper](https://github.com/Murtatrxx) (Web)', true)
            .setFooter(`Requested By ${interaction.member.displayName}`)
            .setTimestamp();
   
   interaction.followUp({embeds: [ embed ]})
  
}
      
if (subcommand === 'channel') {

let ch = interaction.options.getChannel('name')

let channel = bot.guilds.cache.get(interaction.guild.id).channels.cache.get(ch) || interaction.guild.channels.cache.find(r => r.name.toLowerCase() === args.join(' ').toLocaleLowerCase()) || interaction.channel;
        if (!channel) return message.channel.send("**Channel Not Found!**");

        let embed = new MessageEmbed()
            .setTitle(`Channel Information for ${channel.name}`)
            .setThumbnail(interaction.guild.iconURL({ dynamic:  true}))
            .addField("**NSFW**", ` \`\`\`\ ${channel.nsfw} \`\`\`\ `)
            .addField("**Channel ID**", ` \`\`\`\ ${channel.id} \`\`\`\ `)
            .addField("**Channel Type**", ` \`\`\`\ ${channel.type} \`\`\`\ `)
           .addField("**Channel threads**", ` \`\`\`\ ${interaction.guild.channels.cache.filter(channel => channel.type === 'THREAD').size.toString() || "No Threads"} \`\`\`\ `) 
           .addField("**Channel Description**", ` \`\`\`\ ${channel.topic || "No Description"} \`\`\`\ `)
            .addField("**Channel Created At**", ` \`\`\`\ ${channel.createdAt} \`\`\`\ `)
            .setColor(bot.color)
        interaction.editReply({embeds: [ embed ]});

}

if (subcommand === 'role') {

const role = interaction.options.getRole('role') || interaction.guild.roles.cache.get(args[0])

    let ishoist = role.hoist
            if (ishoist === true) ishoist = "Yes";
            if (ishoist === false) ishoist = "No";
    let hex = role.hexColor.split('').slice(1).join("")

    const embed = new MessageEmbed()
    .setColor(role.color)
    .setThumbnail(`https://singlecolorimage.com/get/${hex}/400x400`)
    .addFields(
        {
            name: "Mention & ID",
            value: `${role}\n⚡\`${role.id}\``
        },
        {
            name: "Name",
            value: role.name, inline: true
        },
        {
            name: "Color",
            value: `${role.hexColor}`, inline: true
        },
        {
            name: "Position",
            value: `${role.position}`
        },
        {
            name: `Hoisted`,
            value: `${ishoist}`, inline: true
        },
        {
            name: "Mentionable",
            value: `${role.mentionable}`, inline: true
        },
        
        )
        return interaction.editReply({embeds: [embed]})

}

if (subcommand === 'server') {

const vanityCode = interaction.guild.vanityURLCode;
        let vanityInvite = `https://discord.gg/${vanityCode}`;
        if (vanityCode === null) vanityInvite = 'No custom URL';
        const members = interaction.guild.members.cache;
        const roles = interaction.guild.roles.cache.filter(r => r.id !== interaction.guild.id).map(role => role.toString());
         const embed = new MessageEmbed()
        .setTimestamp()
        .setTitle("**Server Information**")
        .setColor(bot.color)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .addField(`<a:wing:883032991293653062> Name of server:`, interaction.guild.name, true)
        .addField(`<a:emoji_87:883033003574579260> ID of server`, interaction.guild.id, true)
.addField('<a:fire:883233232362033213> Owner ID:', `${(await interaction.guild.fetchOwner()).id}`, true)
        .addField(`<a:king:883032972025028618> Owner Name:`, `${(await interaction.guild.fetchOwner()).user}`, true)
        .addField(`<:768584793691783179:883017859444379648> No. of Members`, interaction.guild.memberCount.toString(), true)
        .addField(`<a:776973591891017749:883017868944502804> No. of Bots:`, interaction.guild.members.cache.filter(member => member.user.bot).size.toString(), true)
        .addField(`<:zz_heart_retsu_f2u:883032970468933633> Emojis:`, interaction.guild.emojis.cache.size.toString(), true)
        .addField(`<a:zzzghostheart:883017884014637066> Animated Emoji\'s:`,interaction.guild.emojis.cache.filter(emoji => emoji.animated).size.toString(),true )
        .addField(`<:text:883017890096361482> # of Text Channel\'s:`,interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size.toString(),true )
        .addField(`<:threadnew:883017877626712084> # of Thread\'s:`,interaction.guild.channels.cache.filter(channel => channel.type === 'THREAD').size.toString(),true )
        .addField(`<:voice:888751078332571729> # of Voice Channel\'s:`,interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size.toString(),true )
        .addField(`<:CommunityRole:888751406020956231> Total Amount of Roles:`, interaction.guild.roles.cache.size.toString(), true)
        .addField(`<a:839921866738106390:883017898984103986> Created at`, `${moment(interaction.guild.createdTimestamp).format('LLL')} | \`${moment(interaction.guild.createdTimestamp).fromNow()}\``, true)
        .addField(`<a:link:888754659639042068> Vanity Link`, `${vanityInvite}`, true)
        .addField(`<:lockedpadlock:883017834232442920> Boost Level`, interaction.guild.premiumTier.toString(), true)
        .addField(`<:booster_bun_HE:815802504829730827> Total Boosts`, interaction.guild.premiumSubscriptionCount.toString(), true)
        .addField(`<a:boost:888752346501382144> Verification Level`, interaction.guild.verificationLevel.toString(), true)
        .addField(`Roles [${roles.length}]`, roles.length < 15 ? roles.join(' | ') : roles.length > 15 ? `${roles.slice(0, 15).join(' | ')} | \`+ ${roles.length-15} roles...\`` : 'None')
        .setAuthor(`${interaction.guild.name}`)
        interaction.editReply({ embeds: [ embed ] });

}

if (subcommand === 'user') {

let user = interaction.options.getUser('user', false);
        if (!user) user = interaction.user;

        let member = await interaction.guild.members.fetch(user.id).catch(() => {});

        let roles, members, position;
        if (member) {
            roles = member.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => role.toString())
                .slice(0, -1);

            members = (await interaction.guild.members.fetch({ time: 9999999, withPresences: true }))
                .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                .map(m => m);

            position = new Promise((ful) => {
                for (let i = 1; i < members.length + 1; i++) {
                    // @ts-ignore
                    if (members[i - 1].id === member.id) ful(i);
                };
            });
        };

        let png = avatar(user, 'png');
        let webp = avatar(user, 'webp');
        let jpg = avatar(user, 'jpg');
        // @ts-ignore
        let gif = avatar(user, 'gif');

        let format = user.displayAvatarURL({ dynamic: true }).substr(user.displayAvatarURL({ dynamic: true }).length - 3);        

        let embed = new MessageEmbed()
            .setAuthor(user.tag, user.displayAvatarURL({ dynamic: true }))
            .setThumbnail(user.avatarURL({ dynamic: true}) )
          .setDescription(`**[${user.username}](https://discord.com/users/${user.id})** created their account on ${moment(user.createdTimestamp).format('Do MMM YYYY')}.`)
            .addField('User information', `**ID:** ${user.id}\n**Username:** ${user.username}\n**Discriminator:** #${user.discriminator}\n**Bot:** ${user.bot ? 'Yes': 'No'}\n**Avatar:** ${format === 'gif' ? `[gif](${gif})` : `[png](${png}) | [webp](${webp}) | [jpg](${jpg})`}`, false)
            .setTimestamp()
            .setColor(bot.color);

        if (member) {
            embed
                .addField('Member information', `**Joined server:** ${moment(member.joinedTimestamp).format('Do MMM YYYY')}\n**Nickname:** ${member.nickname ? member.nickname : 'None'}${member.premiumSinceTimestamp ? `\n**Boosting since:** ${moment(member.premiumSinceTimestamp).format('Do MMM YYY')}` : '\n'}**Member colour:** ${member.displayHexColor === '#000000' ? 'None' : member.displayHexColor.toUpperCase()}\n**Highest role:** ${roles.length > 0 ? member.roles.highest.toString() : 'None'}\n**No. of roles:** ${roles.length || 'None'}\n\n**Roles:** ${!roles.length ? 'None' : roles.length > 10 ? trimArray(roles).join(', ') : roles.join(', ')}`, false)
                .setFooter(`Join position: ${getOrdinal(await position)}`)
                .setColor(bot.color);
        };

        interaction.followUp({ embeds: [embed] });
}
}} 

/**
 * Function to get the avatar formats of a user.
 * @param {import('discord.js').User} user - The user object. 
 * @param {import('discord.js').AllowedImageFormat} format - The allowed image format(s).
 * @returns {string} - Returns whatever lol.
 */
function avatar(user, format) {
    return user.displayAvatarURL({ dynamic: true, format, size: 1024 });
};

/**
 * Gets the ordinal of a number (1st, 2nd, 3rd, etc)
 * @param {number} input - The number input to return an ordinal of.
 * @returns {string} - Returns the number + it's ordinal.
 * @example getOrdinal(10); -> '10th'
 */
function getOrdinal(input) {
    let j = input % 10, k = input % 100;

    if (j == 1 && k != 11) return input + 'st';
    if (j == 2 && k != 12) return input + 'nd';
    if (j == 3 && k != 13) return input + 'rd';

    return input + 'th';
};

/**
 * Trims an array with more than x amount of objects. Useful for paginating embeds with fields more than 10 fields, etc.
 * @param {object[]} array - The array of objects. 
 * @param {number} maxLen - Maximum amount of objects allowed before trimming.
 * @returns {object[]} - Returns the trimmed array of objects.
 */
function trimArray(array, maxLen = 10) {
    if (array.length > maxLen) {
        const len = array.length - maxLen;
        array = array.slice(0, maxLen);
        array.push(` and ${len} more...`);
    };
    return array;
}; 