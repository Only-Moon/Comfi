/* 
* Comfi Bot for Discord 
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International 
* For more information, see README.md and LICENSE 
*/

const { CommandInteraction, EmbedBuilder } = require("discord.js");

module.exports = {
  name: "beg",
  description: "beg someone for money",
  directory: "economy",
  cooldown: 10,
  ownerOnly: false,
  botperm: [""],
  userperm: [""],
  run: async (bot, interaction, args) => {
    const authors = [
      "Ariana Grande",
      "Justin Bieber",
      "Shawn Mendes",
      "Donald Trump",
      "Charlie Puth",
      "Joe Biden",
      "Tony Stark",
      "Hussain Bolt",
      "Cardi B",
      "Cristiano Rondaldo",
      "Lionel Messi",
      "The next door neighbour",
      "Tovade",
      "Potatoexe2930",
      "Ryan Goslin"
    ];
    const auth = authors[Math.floor(Math.random() * authors.length)];
    const random = Math.floor(Math.random() * 3) + 0;

    if (random === 2) {
await interaction.editReply(
        `**${auth}** doesnt wanna give you money! Go beg someone else!`
      );
    } else {
      const quotes = [
        "Ahh you again, why you want money from me :/, Anyways here some cash: ",
        "Im too poor to give you money, but here you go keep the change: ",
        "Well do say more beggers to come to me I give massive cash and here some for you too: ",
        "I kept this money for long time I think someone else deserves it now: ",
        "If you ask me cash the next time i wont give you dude but here this I'll give u: ",
        "Aye its a begger here you go take this: ",
      ];
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      const min = 10; //Minimum of 10
      const max = 500; //Maximum of 100
      const random = Math.floor(Math.random() * (max - min + 1)) + min;

     let data = await bot.eco.AddMoney({UserID: interaction.user.id, Amt: random})
      const currency = bot.emoji("currencyy_Blossomii")

    if (data.status === "success") {

      const embed = new EmbedBuilder()
         .setTitle(auth)
        .setDescription(`${quote}${currency} ${random}\nBalance: ${currency} ${data.wallet}`)
      .setColor(bot.color)
              
await interaction.editReply({embeds: [embed]});
    }
    }
  },
};
