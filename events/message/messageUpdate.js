const bot = require(`../../index`)

bot.on("messageUpdate", async (oldMessage, newMessage) => {
    if(newMessage.author?.bot) return;
    if(!newMessage.content.length) return;

    bot.emit("messageCreate", newMessage)
})