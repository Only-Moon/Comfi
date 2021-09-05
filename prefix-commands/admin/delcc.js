const { db } = require('../../Database.js')

module.exports = {
  config: {
  name: "delcc",
  aliases: ["d-cmd"],
  usage: "delcmd <cmd_name>",
  description: "Delete the custom commannd",
  category: "admin",
  },
  
  run: async (bot, message, args) => {

    let cmdname = args[0];

    if(!cmdname) return message.channel.send(":x: Gimm me commmand name, `delcmd <cmd_name>`")

    let database = await db.fetch(`cmd_${message.guild.id}`)

    if(database) {
      let data = database.has(x => x.name === cmdname.toLowerCase())

      if(!data) return message.channel.send(":x: Unable to find this command.")

      let value = database.indexOf(data)
      delete database[value]

      var filter = database.filter(x => {
        return x != null && x != ''
      })

     await  db.set(`cmd_${message.guild.id}`, filter)
      return message.channel.send(`Deleted the **${cmdname}** Command!`)


    } else {
      return message.channel.send(":x: Sorry but i am unable to find that command!")
    


  }
  }
}