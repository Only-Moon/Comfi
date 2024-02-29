const { model, Schema } = require('mongoose');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

/**
 * Schema for client data.
 *
 * Defines the Mongoose schema for storing client data, including:
 * - clientId: The Discord ID of the client (bot user)
 * - blackListedCmds: Array of blacklisted commands
 * - blackListedUsers: Array of blacklisted user IDs
 * - blackListedServers: Array of blacklisted server IDs
 * - commands: Array of enabled commands
 * - news: Latest news message to send to the client
 * - news_read: Whether the news was read by the client
 * - news_lastUpdated: Date the news was last updated
 */
const schema = new Schema({
	clientId: String,
	blackListedCmds: { type: Array, default: [] },
	blackListedUsers: { type: Array, default: [] },
	blackListedServers: { type: Array, default: [] },
	commands: { type: Array, default: [] },
	news: { type: String, default: null },
	news_read: { type: Boolean, default: false },
	news_lastUpdated: { type: Date, default: null }
})

module.exports = model('Client', schema);
