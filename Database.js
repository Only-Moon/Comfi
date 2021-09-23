const { Database } = require('quickmongo');
const bot = require("./index")
const db = new Database(process.env.Mongoose);

db.on('ready', () => {
    bot.logger.log("[DB]: Database Connected");
});

module.exports = { db };