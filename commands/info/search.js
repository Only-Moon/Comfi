/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { get } = require("request-promise-native");
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  name: "search",
  description: "Search for anime or manga",
  ownerOnly: false,
  options: [
    {
      name: "anime",
      type: "SUB_COMMAND",
      description: "Search for anime",
      options: [
        {
          type: 'STRING',
          description: 'name of anime to search',
          name: 'name',
          required: true,
        },
      ]
    },
    {
      name: "manga",
      description: "Search for manga",
      type: "SUB_COMMAND",
      options: [
        {
          type: "STRING",
          description: "Name of manga to search",
          name: "name",
          required: true
        }
      ]
    }
  ],
  userperm: [""],
  botperm: [""],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (bot, interaction, args) => {
    try {

      const query = interaction.options.getString("name");

      const [sub] = args
      if (sub === "anime") {

        let option = {
          url: `https://kitsu.io/api/edge/anime?filter[text]-${query}`,
          method: "GET",
          headers: {
            "Content-type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
          },
          json: true,
        };

        const res = await get(option).catch(() => {
          return interaction.editReply({
            content: "No results were found!",
          });
        });

        if (!res) return await bot.errorEmbed(bot, interaction, `No results were found!`,
        );

        const anime = res ?.data[0];
        if (!anime) return await bot.errorEmbed(bot, interaction, `No results were found!`,
        );

        if (anime.attributes.ageRating === "R18" && !interaction.channel.nsfw) return await bot.errorEmbed(bot, interaction, `**Nsfw searching not allowed in Non Nsfw Channel**`)

        if (anime.attributes.nsfw && !interaction.channel.nsfw) return await bot.errorEmbed(bot, interaction, `**Nsfw searching not allowed in Non Nsfw Channel**`)

        const animeSearch = {
          title: `${anime.attributes.titles.en_jp}`,
          url: `${anime.links.self}`,
          thumbnail: {
            url: anime.attributes.posterImage.original,
          },
          description: anime.attributes.synopsis,
          fields: [
            {
              name: "⏳ Status",
              value: anime.attributes.status,
              inline: true,
            },
            {
              name: "🗂 Type",
              value: anime.attributes.showType,
              inline: true,
            },
            {
              name: "🗓️ Aired",
              value:
                anime.attributes.startDate && anime.attributes.endDate
                  ? anime.attributes.startDate == anime.attributes.endDate
                    ? `**${anime.attributes.startDate}**`
                    : `From **${
                    anime.attributes.startDate
                      ? anime.attributes.startDate
                      : "N/A"
                    }** to **${
                    anime.attributes.endDate
                      ? anime.attributes.endDate
                      : "N/A"
                    }**`
                  : `From **${
                  anime.attributes.startDate
                    ? anime.attributes.startDate
                    : "N/A"
                  }** to **${
                  anime.attributes.endDate ? anime.attributes.endDate : "N/A"
                  }**`,
              inline: false,
            },
            {
              name: "💽 Total Episodes",
              value: `${
                anime.attributes.episodeCount
                  ? anime.attributes.episodeCount
                  : "N/A"
                }`,
              inline: true,
            },
            {
              name: "⏱ Duration",
              value: `${
                anime.attributes.episodeLength
                  ? anime.attributes.episodeLength
                  : "N/A"
                } Min`,
              inline: true,
            },
            {
              name: "⭐ Average Rating",
              value: `${
                anime.attributes.averageRating
                  ? anime.attributes.averageRating
                  : "N/A"
                }`,
              inline: true,
            },
            {
              name: "🏆 Rank",
              value: `${
                anime.attributes.ratingRank
                  ? "**TOP " + anime.attributes.ratingRank + "**"
                  : "N/A"
                }`,
              inline: true,
            }
          ],
          color: bot.color,
        };

        return await interaction.editReply({
          embeds: [animeSearch],
        });
      }

      if (sub === "manga") {

        const option = {
          url: `https://kitsu.io/api/edge/manga?filter[text]-${query}`,
          method: "GET",
          headers: {
            "Content-type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
          },
          json: true,
        };

        const res = await get(option).catch(() => {
          return interaction.editReply({
            content: "No results were found!",
          });
        });

        if (!res) return await bot.errorEmbed(bot, interaction, `No results were found!`);

        const manga = res.data[0];
        if (!manga) return await bot.errorEmbed(bot, interaction, `No results were found!`);

        if (manga.attributes.ageRating === "R18" && !interaction.channel.nsfw) return await bot.errorEmbed(bot, interaction, `**Nsfw searching not allowed in Non Nsfw Channel**`)

        const mangaSearch = {
          title: `${manga.attributes.titles.en_jp}`,
          url: `${manga.links.self}`,
          thumbnail: {
            url: manga.attributes.posterImage.original,
          },
          description: manga.attributes.synopsis,
          fields: [
            {
              name: "⏳ Status",
              value: manga.attributes.status,
              inline: true,
            },
            {
              name: "🗂 Type",
              value: manga.type,
              inline: true,
            },
            {
              name: "🗓️ Aired",
              value:
                manga.attributes.startDate && manga.attributes.endDate
                  ? manga.attributes.startDate == manga.attributes.endDate
                    ? `**${manga.attributes.startDate}**`
                    : `From **${
                    manga.attributes.startDate
                      ? manga.attributes.startDate
                      : "N/A"
                    }** to **${
                    manga.attributes.endDate
                      ? manga.attributes.endDate
                      : "N/A"
                    }**`
                  : `From **${
                  manga.attributes.startDate
                    ? manga.attributes.startDate
                    : "N/A"
                  }** to **${
                  manga.attributes.endDate ? manga.attributes.endDate : "N/A"
                  }**`,
              inline: false,
            },
            {
              name: "📰 Chapters",
              value: `${
                manga.attributes.chapterCount
                  ? manga.attributes.chapterCount
                  : "N/A"
                }`,
              inline: true,
            },
            {
              name: "📚 Volumes",
              value: `${
                manga.attributes.volumeCount
                  ? manga.attributes.volumeCount
                  : "N/A"
                }`,
              inline: true,
            },
            {
              name: "⭐ Average Rating",
              value: `${
                manga.attributes.averageRating
                  ? manga.attributes.averageRating
                  : "N/A"
                }`,
              inline: true,
            },
            {
              name: "🏆 Rank",
              value: `${
                manga.attributes.ratingRank
                  ? "**TOP " + manga.attributes.ratingRank + "**"
                  : "N/A"
                }`,
              inline: true,
            },
          ],
          color: bot.color,
        };

        return interaction.editReply({
          embeds: [mangaSearch],
        });

      }

    } catch (e) {
      await bot.senderror(interaction, e)
    }
  },
};
