const {
    CommandInteraction,
    EmbedBuilder,
    ApplicationCommandOptionType,
    resolveColor,
} = require("discord.js");
const guilds = require("../../models/guild");

module.exports = {
    name: "embed",
    description: "Easy to use Embed Builder from Comfi",
    ownerOnly: false,
    options: [
        {
            name: "create",
            type: ApplicationCommandOptionType.Subcommand,
            description: "Create an embed using Comfi",
            options: [
                {
                    name: "name",
                    type: ApplicationCommandOptionType.String,
                    description: "Give me a name to create the embed",
                    required: true,
                },
            ],
        },
        {
            name: "delete",
            type: ApplicationCommandOptionType.Subcommand,
            description: "Delete an embed from Comfi' Database",
            options: [
                {
                    name: "name",
                    type: ApplicationCommandOptionType.String,
                    description: "Give me a name to delete the embed",
                    required: true,
                    autocomplete: true
                },
            ],
        },
        {
            name: "edit_author",
            type: ApplicationCommandOptionType.Subcommand,
            description: "Edit author of the embed",
            options: [
                {
                    name: "name",
                    type: ApplicationCommandOptionType.String,
                    description: "Give me an embed name to edit",
                    required: true,
                    autocomplete: true
                },
                {
                    name: "text",
                    description: "Give me the text for embed's author",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                    max_length: 256,
                },
                {
                    name: "icon",
                    description: "Attach me an image for embed's author",
                    type: ApplicationCommandOptionType.Attachment,
                    required: false,
                },
                {
                    name: "link",
                    description: "Give me an image url for embed's author",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
            ],
        },
        {
            name: "edit_color",
            type: ApplicationCommandOptionType.Subcommand,
            description: "Edit color of an embed",
            options: [
                {
                    name: "name",
                    type: ApplicationCommandOptionType.String,
                    description: "Give me an embed name to edit",
                    required: true,
                    autocomplete: true
                },
                {
                    name: "color",
                    type: ApplicationCommandOptionType.String,
                    description: "Give me a color for embed - hex (#f4b3ca) ",
                    required: false,
                    max_length: 7,
                },
            ],
        },
        {
            name: "edit_description",
            type: ApplicationCommandOptionType.Subcommand,
            description: "Edit description of the embed",
            options: [
                {
                    name: "name",
                    type: ApplicationCommandOptionType.String,
                    description: "Give me an embed name to edit",
                    required: true,
                    autocomplete: true
                },
                {
                    name: "description",
                    description: "Give me a description for embed",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                    max_length: 4096,
                },
            ],
        },
        {
            name: "edit_footer",
            type: ApplicationCommandOptionType.Subcommand,
            description: "Edit footer of the embed",
            options: [
                {
                    name: "name",
                    type: ApplicationCommandOptionType.String,
                    description: "Give me an embed name to edit",
                    required: true,
                    autocomplete: true
                },
                {
                    name: "text",
                    description: "Give me the text for embed's footer",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                    max_length: 2048,
                },
                {
                    name: "icon",
                    description: "Attach me an image for embed's footer",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
                {
                    name: "link",
                    description: "Give me an image url for embed's author",
                    type: ApplicationCommandOptionType.Attachment,
                    required: false,
                },
            ],
        },
        {
            name: "edit_image",
            type: ApplicationCommandOptionType.Subcommand,
            description: "Edit image of the embed",
            options: [
                {
                    name: "name",
                    type: ApplicationCommandOptionType.String,
                    description: "Give me an embed name to edit",
                    required: true,
                    autocomplete: true
                },
                {
                    name: "attachment",
                    description: "Attach me an image to set image for the embed",
                    type: ApplicationCommandOptionType.Attachment,
                    required: false,
                },
                {
                    name: "link",
                    description: "Give me an image link to set image for Embed",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
            ],
        },
        {
            name: "edit_thumbnail",
            type: ApplicationCommandOptionType.Subcommand,
            description: "Edit thumbnail of the embed",
            options: [
                {
                    name: "name",
                    autocomplete: true,
                    type: ApplicationCommandOptionType.String,
                    description: "Give me an embed name to edit",
                    required: true,
                },
                {
                    name: "attachment",
                    description: "Attach me an image to set thumbnail for the embed",
                    type: ApplicationCommandOptionType.Attachment,
                    required: false,
                },
                {
                    name: "link",
                    description: "Give me an image link to set thumbnail for Embed",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                },
            ],
        },
        {
            name: "edit_timestamp",
            type: ApplicationCommandOptionType.Subcommand,
            description: "Edit timestamp of the embed",
            options: [
                {
                    name: "name",
                    type: ApplicationCommandOptionType.String,
                    description: "Give me an embed name to edit",
                    required: true,
                    autocomplete: true
                },
                {
                    name: "timestamp",
                    type: ApplicationCommandOptionType.Boolean,
                    description: "Enable or Disable timestamp for Embed's footer",
                },
            ],
        },
        {
            name: "edit_title",
            type: ApplicationCommandOptionType.Subcommand,
            description: "Edit title of the embed",
            options: [
                {
                    name: "name",
                    type: ApplicationCommandOptionType.String,
                    description: "Give me an embed name to edit",
                    required: true,
                    autocomplete: true
                },
                {
                    name: "title",
                    description: "Give me a title for the embed",
                    type: ApplicationCommandOptionType.String,
                    required: false,
                    max_length: 256,
                },
            ],
        },
        {
            name: "list",
            type: ApplicationCommandOptionType.Subcommand,
            description: "Shows the list of servers in the server",
        },
        {
            name: "show",
            type: ApplicationCommandOptionType.Subcommand,
            description: "Display an embed",
            options: [
                {
                    name: "name",
                    type: ApplicationCommandOptionType.String,
                    description: "Give me embed name to display",
                    required: true,
                    autocomplete: true
                },
            ],
        },
    ],
    directory: "utility",
    userperm: [""],
    botperm: [""],
    /**
     *
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
        const [sub] = args;
        const guild = await guilds.findOne({ guildId: interaction.guild.id });
        const name = interaction.options.getString("name");

        if (sub === "create") {
            if (!guild.embeds.find((embed) => embed.name === name.replace(/(\w)(\w*)/g,
        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();}))) {
                if (guild.embeds_count <= 10) {
                    await guilds.findOneAndUpdate(
                        {
                            guildId: interaction.guild.id,
                        },
                        {
                            $push: {
                                embeds: {
                                name: name.replace(/(\w)(\w*)/g,
        function(g0,g1,g2){return g1.toUpperCase() + g2.toLowerCase();}),
                                    author: { name: undefined, iconURL: undefined },
                                    color: undefined,
                                    description: undefined,
                                    footer: { text: undefined, iconURL: undefined },
                                    image: undefined,
                                    timestamp: undefined,
                                    thumbnail: undefined,
                                    title: undefined,
                                },
                            },
                            embeds_count: +1,
                        }
                    );

                    return await bot.successEmbed(
                        bot,
                        interaction,
                        `Successfully created an embed with Name: ${name}`
                    );
                } else if (guild.embeds_count >= 10) {
                    return await bot.errorEmbed(
                        bot,
                        interaction,
                        "The maximum number of embeds for one server is 10"
                    );
                }
                return await bot.errorEmbed(
                    bot,
                    interaction,
                    `Embed with the Name: ${name} already exist`
                );
            } else {
                return await bot.errorEmbed(
                    bot,
                    interaction,
                    `Embed with the Name: ${name} already exist`
                );
            }
        }

        if (sub === "delete") {
            if (guild.embeds.find((embed) => embed.name === name)) {
                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, name: name.toLowerCase() },
                    {
                        $pull: { embeds: { name } },
                        embeds_count: -1,
                    }
                );

                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully deleted an embed with Name: ${name}`
                );
            }
            return await bot.errorEmbed(
                bot,
                interaction,
                `Embed with the Name: ${name} does not exist`
            );
        }

        if (sub === "edit_author") {
            const text = interaction.options.getString("text");
            const icon = interaction.options.getAttachment("icon")
                ? interaction.options.getAttachment("icon").url
                : null;
            let link = interaction.options.getString("link");

            link = bot.functions.match_regex("img", link) ? link : null;

            const data = {
                author: {},
            };

            if ((!text && !icon) || !link) {
                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.author": null,
                        },
                    }
                );
                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully removed author for the embed with Name: ${name}`
                );
            } else {
                if (text) data.author.name = text;

                if (icon || link) data.author.iconURL = icon || link;

                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.author": data.author,
                        },
                    }
                );

                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully edited author for the embed with Name: ${name}`
                );
            }
        }

        if (sub === "edit_color") {
            let color = interaction.options.getString("color");

            color = bot.functions.match_regex("color", color) ? color : null;
            if (!color) {
                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.color": null,
                        },
                    }
                );
                await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully removed color for the embed with Name: ${name}`
                );
            } else {
                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.color": resolveColor(color),
                        },
                    }
                );
                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully edited color for the embed with Name: ${name}`
                );
            }
        }

        if (sub === "edit_description") {
            const description = interaction.options.getString("description");

            if (!description) {
                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.description": null,
                        },
                    }
                );
                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully removed description for the embed with Name: ${name}`
                );
            } else {
                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.description": description,
                        },
                    }
                );

                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully edited description for the embed with Name: ${name}`
                );
            }
        }

        if (sub === "edit_footer") {
            const text = interaction.options.getString("text");
            const icon = interaction.options.getAttachment("icon")
                ? interaction.options.getAttachment("icon").url
                : null;
            let link = interaction.options.getString("link");

            link = bot.functions.match_regex("img", link) ? link : null;

            const data = {
                footer: {},
            };

            if ((!text && !icon) || !link) {
                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.footer": null,
                        },
                    }
                );
                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully removed title for the embed with Name: ${name}`
                );
            } else {
                if (text) data.footer.text = text;

                if (icon || link) data.footer.iconURL = icon || link;
                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.footer": data.footer,
                        },
                    }
                );

                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully edited footer for the embed with Name: ${name}`
                );
            }
        }

        if (sub === "edit_image") {
            const icon = interaction.options.getAttachment("attachment")
                ? interaction.options.getAttachment("attachment").url
                : null;

            let link = interaction.options.getString("link");

            link = bot.functions.match_regex("img", link) ? link : null;
            let image;

            if (!icon || !link) {
                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.image": null,
                        },
                    }
                );
                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully removed image for the embed with Name: ${name}`
                );
            } else {
                if (icon || link) image = icon || link;

                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.image": image,
                        },
                    }
                );

                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully edited image for the embed with Name: ${name}`
                );
            }
        }

        if (sub === "edit_thumbnail") {
            const icon = interaction.options.getAttachment("attachment")
                ? interaction.options.getAttachment("attachment").url
                : null;

            let link = interaction.options.getString("link");

            link = bot.functions.match_regex("img", link) ? link : null;
            let image;

            if (!icon || !link) {
                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.thumbnail": null,
                        },
                    }
                );
                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully removed thumbnail for the embed with Name: ${name}`
                );
            } else {
                if (icon || link) image = icon || link;

                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.thumbnail": image,
                        },
                    }
                );

                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully edited image for the embed with Name: ${name}`
                );
            }
        }

        if (sub === "edit_timestamp") {
            const timestamp = interaction.options.getBoolean("timestamp");

            if (!timestamp) {
                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.timestamp": false,
                        },
                    }
                );
                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully removed timestamp for the embed with Name: ${name}`
                );
            }

            await guilds.findOneAndUpdate(
                { guildId: interaction.guild.id, "embeds.name": name },
                {
                    $set: {
                        "embeds.$.timestamp": timestamp,
                    },
                }
            );

            return await bot.successEmbed(
                bot,
                interaction,
                `Successfully edited timestamp for the embed with Name: ${name}`
            );
        }

        if (sub === "edit_title") {
            const title = interaction.options.getString("title");

            if (!title) {
                await guilds.findOneAndUpdate(
                    { guildId: interaction.guild.id, "embeds.name": name },
                    {
                        $set: {
                            "embeds.$.title": null,
                        },
                    }
                );
                return await bot.successEmbed(
                    bot,
                    interaction,
                    `Successfully removed title for the embed with Name: ${name}`
                );
            }

            await guilds.findOneAndUpdate(
                { guildId: interaction.guild.id, "embeds.name": name },
                {
                    $set: {
                        "embeds.$.title": title,
                    },
                }
            );

            return await bot.successEmbed(
                bot,
                interaction,
                `Successfully edited description for the embed with Name: ${name}`
            );
        }

        if (sub === "list") {
            if (guild.embeds.length === 0 || guild.embeds_count == 0) {
                return await bot.errorEmbed(
                    bot,
                    interaction,
                    "There are no embeds for this guild"
                );
            }
            const dot = bot.emoji("bunny_cs");
            const one = bot.emoji("_1_HE");
            const two = bot.emoji("_2_HE");
            const three = bot.emoji("_3_HE");
            let data;

            data = guild.embeds.sort().map((value, i) => {
                const top10 = [];
                const pos = guild.embeds_count;

                const emojis = [`${one}`, `${two}`, `${three}`];
                top10.push(`**${emojis[i] || dot} #${pos})** ${value.name}`);

                return top10;
            });

            const embed = new EmbedBuilder()
                .setAuthor({
                    name: "Comfi™ Embed List!",
                    iconURL: interaction.guild.iconURL({ dynamic: true }),
                })
                .setDescription(data.slice(0, 10).join("\n"))
                .setFooter({
                    text: `Requested by ${interaction.member.displayName}`,
                    iconURL: interaction.user.avatarURL({ dynamic: true }),
                })
                .setColor(bot.color);
            return await interaction.editReply({ embeds: [embed] });
        }

        if (sub === "show") {
            const embed = guild.embeds.find((embed) => embed.name === name);

            if (!embed)
                return await bot.errorEmbed(
                    bot,
                    interaction,
                    `No embed found with name: ${name}`
                );

            const embed_new = EmbedBuilder.from(embed);

            if (!embed.description) return await bot.errorEmbed(bot, interaction, "Have a description for the embed before trying to display it")

            await interaction.editReply({ embeds: [embed_new] });
        }

    },
};
