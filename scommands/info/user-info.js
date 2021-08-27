const moment = require('moment');
const { MessageEmbed } = require('discord.js');

module.exports = {
            name: 'user-info',
            description: 'Returns all of your user information, unless another user is specified.',
            ownerOnly: false,
            options: [
                {
                    type: 'USER',
                    name: 'user',
                    description: 'The specified user you\'d like to retrieve information for.',
                    required: false
                }
            ],
    userperm: [""],
    botperm: [""],

run: async (bot, interaction, args) => {
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
            .setDescription(`**[${user.username}](https://discord.com/users/${user.id})** created their account on ${moment(user.createdTimestamp).format('Do MMM YYYY')}.`)
            .addField('User information', `**ID:** ${user.id}\n**Username:** ${user.username}\n**Discriminator:** #${user.discriminator}\n**Bot:** ${user.bot ? 'Yes': 'No'}\n**Avatar:** ${format === 'gif' ? `[gif](${gif})` : `[png](${png}) | [webp](${webp}) | [jpg](${jpg})`}`, false)
            .setTimestamp()
            .setColor('RANDOM');

        if (member) {
            embed
                .addField('Member information', `**Joined server:** ${moment(member.joinedTimestamp).format('Do MMM YYYY')}\n**Nickname:** ${member.nickname ? member.nickname : 'None'}${member.premiumSinceTimestamp ? `\n**Boosting since:** ${moment(member.premiumSinceTimestamp).format('Do MMM YYY')}` : '\n'}**Member colour:** ${member.displayHexColor === '#000000' ? 'None' : member.displayHexColor.toUpperCase()}\n**Highest role:** ${roles.length > 0 ? member.roles.highest.toString() : 'None'}\n**No. of roles:** ${roles.length || 'None'}\n\n**Roles:** ${!roles.length ? 'None' : roles.length > 10 ? trimArray(roles).join(', ') : roles.join(', ')}`, false)
                .setFooter(`Join position: ${getOrdinal(await position)}`)
                .setColor(member.displayHexColor === '#000000' ? '#2F3136' : member.displayHexColor);
        };

        interaction.followUp({ embeds: [embed] });
    }
}

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
