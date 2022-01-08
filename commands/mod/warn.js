const warnSchema = require('../../models/users');
const uuid = require('uuid');
const { MessageEmbed } = require('discord.js');

module.exports = {
	    name: 'warn',
      description:
				'Warn a user, get a list of a user, and remove the warned user!',
			ownerOnly:  false,
			userPerm: ['KICK_MEMBERS', 'BAN_MEMBERS'],
			botPerm: ['KICK_MEMBERS', 'BAN_MEMBERS'],
			options: [
				{
					name: 'add',
					description: 'Warn a user!',
					type: 'SUB_COMMAND',
					options: [
						{
							name: 'user',
							description: 'Provide a user to warn them!',
							type: 'USER',
							required: true,
						},
						{
							name: 'reason',
							description: 'Provide a reason!',
							type: 'STRING',
							required: true,
						},
					],
				},
				{
					name: 'list',
					description: 'Get a list of the warned user!',
					type: 'SUB_COMMAND',
					options: [
						{
							name: 'user',
							description: "Provide a user to get it's list",
							type: 'USER',
							required: true,
						},
					],
				},
				{
					name: 'remove',
					description: 'Remove a warned user!',
					type: 'SUB_COMMAND',
					options: [
						{
							name: 'warnid',
							description: 'Provide a warnID to remove the warned user!',
							type: 'STRING',
							required: true,
						},
						{
							name: 'user',
							description: 'Provide a user to remove the warned user!',
							type: 'USER',
							required: true,
						},
					],
				},
			],

run: async (bot, interaction, args) => {
		const subCommandName = interaction.options._subcommand;

		const user = interaction.options.getUser('user');
		const getWarnId = interaction.options.getString('warnid');

		switch (subCommandName) {
			case 'add':
				const getReason = interaction.options.getString('reason');

				const warnObj = {
					authorId: interaction.user.id,
					timestamp: Math.floor(Date.now() / 1000),
					warnId: uuid.v4(),
					reason: getReason,
				};

				const warnAddData = await warnSchema.findOneAndUpdate(
					{
						guildId: interaction.guild.id,
						userId: user.id,
					},
					{
						guildId: interaction.guild.id,
						userId: user.id,
						$push: {
							warns: warnObj,
						},
					},
					{
						upsert: true,
					},
				);
				const warnCount = warnAddData ? warnAddData.warns.length + 1 : 1;
				const warnGrammar = warnCount === 1 ? '' : 's';

let warn = new MessageEmbed()
        .setTitle(`__Warned__`)    
        .setDescription(`You have been warned by ${interaction.user} \n Reason: ${getReason}`)
            .setColor(bot.color);
        user.send({embeds: [ warn ]})
            .catch(error => interaction.editReply(`Sorry ${interaction.user} I couldn't n't warn because of : ${error}`));
            let warnEmbed = new MessageEmbed()
            .setTitle("**__Warn Report__**")
            .setDescription(`Warned **${user.tag}**, They now have **${warnCount}** warning${warnGrammar}`)
            .setColor(bot.color);
            interaction.editReply({embeds: [ warnEmbed ]});
				break;

			case 'list':
				const warnedResult = await warnSchema.findOne({
					guildId: interaction.guild.id,
					userId: user.id,
				});

				if (!warnedResult || warnedResult.warns.length === 0)
					return interaction.editReply({
						content: `${bot.error} That user has no warning record!`,
						ephemeral: true,
					});

				let string = '';
				const embed = new MessageEmbed()
					.setColor(bot.color)
					.setDescription(string);

				const getWarnedUser = interaction.guild.members.cache.find(
					(user) => user.id === warnedResult.userId,
				);
				for (const warning of warnedResult.warns) {
					const { authorId, timestamp, warnId, reason } = warning;
					const getModeratorUser = interaction.guild.members.cache.find(
						(user) => user.id === authorId,
					);
					string += embed
						.addField(
							`Warn ID: ${warnId} | Moderator: ${getModeratorUser?.user.tag}`,
							`${reason} - <t:${timestamp}>`,
						)
						.setTitle(`${getWarnedUser.user.username}'s Warning Lists!`);
				}

				interaction.editReply({ embeds: [embed] });
				break;

			case 'remove':
				const validateUUID = uuid.validate(getWarnId);

				if (validateUUID) {
					const warnedRemoveData = await warnSchema.findOneAndUpdate(
						{
							guildId: interaction.guild.id,
							userId: user.id,
						},
						{
							$pull: { warns: { warnId: `${getWarnId}` } },
						},
					);

					const getRemovedWarnedUser = interaction.guild.members.cache.find(
						(user) => user.id === warnedRemoveData.userId,
					);

					const warnedRemoveCount = warnedRemoveData
						? warnedRemoveData.warns.length - 1
						: 0;
					const warnedRemoveGrammar = warnedRemoveCount === 1 ? '' : 's';

let warnEmbed = new MessageEmbed()
            .setTitle("**__Warn Report__**")
            .setDescription(`Successfully deleted **${getRemovedWarnedUser.user.tag}** warning, they now have **${warnedRemoveCount}** warning${warnedRemoveGrammar}!`)
           .setColor(bot.color)
      interaction.editReply({embeds: [ warnEmbed ]})
          } else {
					interaction.editReply({
						content: `${bot.error} That is not a valid Warn ID!`,
						ephemeral: true,
					});
				}

				break;
		}
	}
};
