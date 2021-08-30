const { PREFIX } = require('../config.js');
const { glob } = require("glob");
const { promisify } = require("util");

const express = require('express');
const app = express();
const port = 8000 || process.env['PORT'];
   
module.exports.run = async (bot) => {
   const port = process.env.PORT || 3000;

    const cmds = `
    ${bot.slashCommands.map(command => `
    <table>
    <tr>
    <td>/${command.name}</td>
    <br>
    </br>
    <td> [ <th>Description: ${command.description} ]</th> </td>
    </tr> 
    </table>
    `
   )}
    `

    const html = `
    <div align="center">
    <h1>Discord Bot Commands</h1>
    ${cmds}
    </div>
    `

    app.get('/', async (req, res) => {
        res.status(200).send(html);
    })

    app.listen(port, function () { console.log(`Listening on port http://localhost:${port}`) })
  
	console.log(`[INFO]: Ready on client (${bot.user.tag})`);
	console.log(
		`[INFO]: Watching ${bot.commands.size} Commands \n[INFO]: Watching ${bot.slashCommands.size} SlashCommands \n[INFO]: Watching ${bot.guilds.cache.size} Servers \n[INFO]: Watching ${
			bot.channels.cache.size
		} channels \n[INFO]: Watching ${bot.users.cache.size} users`
	);
  
	console.log('-------------------------------------');

const arrayOfStatus = [
    `${bot.guilds.cache.size} servers`,
    `${bot.guilds.cache.reduce((users, value) => users + value.memberCount, 0)} members`,
    `${PREFIX}help | Stay Safe :)`,
  ];

  let index = 0;
  
  setInterval(() => {
    if (index === arrayOfStatus.length) index = 0;
    const status = arrayOfStatus[index];
    
    bot.user.setActivity(`${status}`, {
      type: "WATCHING",
      url: "https://www.twitch.tv/blue666opislive",
    });
    index++;
  }, 10000);
}