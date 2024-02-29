const { model, Schema } = require('mongoose');

/*
* Comfi Bot for Discord
* Copyright (C) 2023 Xx-Mohit-xX
* This software is licensed under Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International
* For more information, see README.md and LICENSE
*/

/**
 * Schema definition for user documents in MongoDB.
 *
 * Defines the shape of documents in the 'users' collection.
 *
 * Includes fields for:
 * - User ID and guild ID
 * - Moderation warnings
 * - Leveling system XP and level
 * - AFK status
 * - Command cooldown tracking
 */
const schema = new Schema({
	// General
	userId: String,
	guildId: String,

	// Mod
	warns: { type: Object, default: [] },

	// Leveling
	level: { type: Number, default: 0 },
	xp: { type: Number, default: 0 },
	requiredXp: { type: Number, default: 500 },

	// Afk
	afk: { type: Boolean, default: false },
	afk_reason: String,
	afk_set: String,

	// Cooldown
	cmd: { type: String },
	time: { type: Number, default: 0 },
	cooldown: { type: Number, default: 0 }
})

module.exports = model('Users', schema);
