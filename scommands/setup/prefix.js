const { db } = require('../../Database.js');
const { MessageEmbed, CommandInteraction } = require('discord.js');
const { PREFIX } = require('../../config.js');

module.exports = {
    name: "prefix",
    description: "Sets a prefix",
    ownerOnly: false,
    options: [
        {
            type: 'STRING',
            description: 'prefix to set',
            name: 'prefix',
            required: true,
        },
    ],
    userperm: ["MANAGE_GUILD"],
    botperm: ["MANAGE_MESSAGES"],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {	

   let option = args[0];

		if (!option) {
			prefix = await db.fetch(`prefix_${message.guild.id}`);
			if (!prefix) prefix = PREFIX;
			let prefEmbed = new MessageEmbed()
				.setColor('YELLOW')
				setDescription(					
          `**My prefix for \`${message.guild.name}\` is **` +						
          ` \`${prefix}\` \n**Type \`${prefix}help\` for help**`		
        );

			await interaction.editReply({embeds: [ prefEmbed ]});
		} else if (option.toLowerCase() === 'reset') {
			await db.delete(`prefix_${interaction.guild.id}`);
			return interaction.editReply('Reseted Prefix ✅');
		} else if (args[1]) {
			return interaction.editReply('You can not set prefix a double argument');
		} else if (args[0].length > 4) {
			return interaction.editReply(
				'You can not send prefix more than 4 characters'
			);
		} else if (args.join('') === PREFIX) {
			await db.delete(`prefix_${interaction.guild.id}`);
			return await interaction.editReply('Reseted Prefix ✅');
		} else {

	await	db.set(`prefix_${interaction.guild.id}`, args[0]);
		await interaction.editReply(`Done ✅ | Bot Prefix Set to ${args[0]}`);
		}
	}
};
