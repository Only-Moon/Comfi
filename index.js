// ----------[ LOADING BOT ]----------\\

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

// -----[ DEFINING DEPENDENCIES ]-----\\

/**
 * Initializes and exports the Comfi bot instance.
 *
 * Loads the Comfi bot utils and creates a new Comfi instance.
 * Connects to Discord and sets the max listeners to 0.
 * Exports the Comfi instance for use in other files.
 */
// Uncomment this if you need
require('dotenv').config()

const Comfi = require('./utils/Comfi')
const bot = new Comfi()

bot.connect()
bot.setMaxListeners(0)

module.exports = bot

// ---------[ PROCESS ENDED ]---------\\
