const bot = require('../../index')
const { EmbedBuilder } = require('discord.js')
const guilds = require('../../models/guild')
const fetch = require('node-fetch')

/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

bot.on('messageCreate', async message => {
  if (
    message.author.bot ||
    !message.guild ||
    message.webhookID ||
    !message.channel
  )
    return;


  const guild = await guilds.findOne({ guildId: message.guild.id })

  let disabled = new EmbedBuilder()
    .setTitle(`${bot.error} • Chatbot Error`)
    .setColor(bot.color)
    .setDescription('Chat Bot is disabled by the Owner in this Server!')
    .setFooter({ text: `Requested by ${message.author.username}` })

  if (guild?.chatbot) {
    let ch = guild?.chat_channel

		if (!ch || ch === undefined) return

    if (message.channel?.id === ch) {
      try {
				const ranges = [
					'\ud83c[\udf00-\udfff]', // U+1F300 to U+1F3FF
					'\ud83d[\udc00-\ude4f]', // U+1F400 to U+1F64F
					'\ud83d[\ude80-\udeff]' // U+1F680 to U+1F6FF
				]

				let input = message.cleanContent.replace(
					new RegExp(ranges.join('|'), 'g'),
					'.'
				)

				//Replacing Emojis
				input = input.replace(/<a?:.+:\d+>/gm, '')

				await message.channel.sendTyping().catch(() => null)

				const url = new URL('https://simplyapi.js.org/api/chatbot'),
					params = url.searchParams,
					age = new Date().getFullYear() - bot.user.createdAt.getFullYear()

				params.set('message', input)
				params.set('developer', 'moonbow#5817')
				params.set('name', bot.user.username)
				params.set('age', age)
				params.set('year', bot.user.createdAt.getFullYear())
				params.set('bday', bot.user.createdAt.toLocaleDateString())
				params.set('birthplace', 'Comfi Development')
				params.set('gender', 'female')
				params.set('uid', message.author.id)

        console.log(message)
				// Using await instead of .then
				const jsonRes = await fetch(url).then(res => res.json()).catch(async (e) => {
              await bot.senderror(message, e)
        })// Parsing the JSON

				const chatbotReply = jsonRes.reply
					.replace(/@everyone/g, '`@everyone`') //RegExp with g Flag will replace every @everyone instead of just the first
					.replace(/@here/g, '`@here`')

				if (chatbotReply === '') {
					return message.reply({
						content: 'Uh What ?',
						allowedMentions: { repliedUser: false }
					})
				}
				await message
					.reply({
						content: jsonRes.error ? jsonRes.error : chatbotReply,
						allowedMentions: { repliedUser: false }
					})
					.catch(() => null)
      } catch (err) {
        if (err instanceof fetch.FetchError) {
          if (err.type === 'invalid-json') {
            message
              .reply({ content: '**Error:**\n```API offline```' })
              .catch(() => null) //Catch errors that happen while fetching
          }
        } else  {
    await bot.senderror(message, err)

    }
      }
    } else return;
  } else if (!guild.chatbot && message.channel?.id === guild.chat_channel) {
    return (
      message.delete(),
      message.author.send({ embeds: [disabled] }).catch(() => null)
    )
  }
})
