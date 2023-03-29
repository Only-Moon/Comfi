// ----------[ LOADING BOT ]----------\\

/*
* Comfi Bot for Discord
* Copyright (C) 2021 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

console.clear();
console.log('Loading Bot...');

// -----[ DEFINING DEPENDENCIES ]-----\\

// Uncomment this if you need
// require('dotenv').config()
const Comfi = require('./utils/Comfi');

const bot = new Comfi();

module.exports = bot;

// ---------[ PROCESS ENDED ]---------\\
