const { Database } = require('quickmongo');
const db = new Database(process.env.Mongoose);

db.on('ready', () => {
    console.log("[DB]: Database Connected");
});

module.exports = { db };