const fetch = require("node-fetch");

module.exports = {
  config: {
  name: "ss",
  aliases: ["screenshot"],
  category: "info",
  description: "Takes a screenshot of any webpage.",
  usage: "screenshot <URL>",
  },
  run: async (bot, message, args) => {
   
    const user = message.author.tag
    const urls = args[0];
    if (!urls)
      return message.channel
        .send(`\`\`\`\n${user}, where is the link -_-\n\`\`\``)
        
 if (urls.length < 3)
      return message
        .reply("https is too short to reach - 3 limit")
        .catch(e => {});

    let m = await message.channel.send("Getting image...")
    const site = /^(https?:\/\/)/i.test(urls) ? urls : `http://${urls}`;
    try {
      const { body } = await fetch(
        `https://image.thum.io/get/width/1920/crop/675/noanimate/${site}`
      );

      m.channel.send({ files: [{ attachment: body, name: "Screenshot.png" }]});
      m.delete();
    } catch (err) {
      if (err.status === 404)
        return message.channel
          .send("Could not find any results. Invalid URL?")
          .catch(e => {})
      
      return message
        .reply(`Oh no, an error occurred: \`${err.message}\`. Try again later!`)
        .catch(e => {});
    }
  }
};