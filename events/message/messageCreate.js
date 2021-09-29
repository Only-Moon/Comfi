const bot = require("../../index");
const guilds = require(`../../models/guild`)
const users = require(`../../models/users`)

bot.on("messageCreate", async (message) => {
    if(message.author.bot || !message.guild ) return;
  
const guild = await guilds.findOne({guildId: message.guild.id})
    if(!guild) { await guilds.create({guildId: message.guild.id})}

    let prefix = guild ? guild.prefix : "Cr!"

    require(`../../functions/afk`)(message)
    
  if(guild.leveling) {
  if(message.author.bot) return;
  const userOnLevel = await users.findOne({userId: message.author.id, guildId: message.guild.id})
if(!userOnLevel) { await users.create({userId: message.author.id, guildId: message.guild.id})}
            require(`../../functions/leveling`)(message, bot)
        }

    if ( message.author.bot || !message.guild || !message.content.toLowerCase().startsWith(prefix)) return;
    const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/);
    const command = bot.commands.get(cmd.toLowerCase()) || bot.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));
    if (command) {
        const user = await users.findOne({userId: message.author.id, guildId: message.guild.id})
        if(!user) { await users.create({userId: message.author.id, guildId: message.guild.id})}

        const props = {
            prefix: guild.prefix,
            guild: guild
        }
    
        await command.run(bot, message, args, props);
    } 
  
    
});