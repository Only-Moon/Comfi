const { Database } = require('quickmongo');
const db = new Database("mongodb+srv://mohit841:MohitKoul@cluster0.yhyii.mongodb.net/Comfi-Djs-v13");

db.on('ready', () => {
    console.log("[DB]: Database Connected!");
});

module.exports = { db };