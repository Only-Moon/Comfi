/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const warnSchema = require('../../models/users');
const uuid = require('uuid');
const { MessageEmbed } = require('discord.js');

module.exports = {
	    name: 'warn',
      description:
				'Warn a user, get a list of a user, and remove the warned user!',
			ownerOnly:  false,
  directory: "warn",
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
							description: 'Provide a user to remove the warning!',
							type: 'USER',
							required: true,
						},
						{
							name: 'reason',
							description: 'Provide a us reason!',
							type: 'STRING',
							required: false,
						}
					],
				},
			],

run: async (bot, interaction, args) => {
		const subCommandName = interaction.options._subcommand;

		const user = interaction.options.getUser('user');
		const getWarnId = interaction.options.getString('warnid');
  const reason = interaction.options.getString("reason")
try {
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
        .setDescription(`You have been warned by ${interaction.user} \nReason: ${getReason}`)
            .setColor(bot.color);
        user.send({embeds: [ warn ]})
            .catch(() => null)
            let warnEmbed = new MessageEmbed()
            .setTitle("**__Warn Report__**")
            .setDescription(`${bot.tick} • Warned **${user.tag}** \n${bot.tick} • They now have **${warnCount}** warning${warnGrammar} \n${bot.tick} • Reason: ${getReason}`)
            .setColor(bot.color);
            await interaction.editReply({embeds: [ warnEmbed ]}).then((msg) => {
  setTimeout(() => { if(msg.deletable) msg.delete() }, bot.ms('30s'))
  });
await bot.modlog({ Member: user.member, 
                  Action: "warn", 
                  Reason: getReason.length < 1 ? 'No reason supplied.' : getReason
                 }, interaction)        
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
						.addFields({							
              name: `ID: ${warnId} • Moderator: ${getModeratorUser?.user.tag}`,							
              value: `> <a:pinkheart_cs:883033001599074364> • **Reason:** ${reason} \n> <a:pinkheart_cs:883033001599074364> • **Date:** <t:${timestamp}>`						
            })						
            .setTitle(`${getWarnedUser.user.username}'s Warning Lists!`)
				}

				await interaction.editReply({ embeds: [embed] });
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
      await interaction.editReply({embeds: [ warnEmbed ]})
await bot.modlog({ Member: getRemovedWarnedUser, 
                  Action: "warn remov", 
                  Reason: reason?.length < 1 ? 'No reason supplied.' : reason,
                  Mod: warnedRemoveData.authorId ? warnedRemoveData.authorId : "Not Found"
                 }, interaction)          } else {
					await interaction.editReply({
						content: `${bot.error} That is not a valid Warn ID!`,
						ephemeral: true,
					});
				}

				break;
		}
	} catch (e) {
			let emed = new MessageEmbed()
				.setTitle(`${bot.error} • Error Occured`)
				.setDescription(`\`\`\`${e.stack}\`\`\``)
				.setColor(bot.color)

			bot.sendhook(null, {
				channel: bot.err_chnl,
				embed: emed
			})

			interaction.followUp({
				embeds: [
					{
						description: `${
							bot.error
						} Error, try again later \n Error: ${e} \n [Contact Support](https://comfibot.tk/discord) `,
						color: bot.color
					}
				]
			})
}}
};
