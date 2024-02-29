"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");

/**
 * Schema definition for a giveaway object.
 * Defines the shape of documents in the giveaways collection.
 *
 * @typedef {Object} Giveaway
 * @property {string} message - Message to display for the giveaway.
 * @property {string} prize - Prize being given away.
 * @property {number} started - Timestamp for when giveaway started.
 * @property {Array} entry - Array of users who entered giveaway.
 * @property {number} entered - Number of users entered.
 * @property {number} winCount - Number of winners to select.
 * @property {Object} requirements - Requirements to enter giveaway.
 * @property {string} endTime - Timestamp for giveaway end.
 * @property {string} host - User hosting the giveaway.
 * @property {string} desc - Description for the giveaway embed.
 */
var gw = new mongoose_1.default.Schema({
	message: { type: String },
	prize: { type: String },
	started: { type: Number },
	entry: { type: Array() },
	entered: { type: Number },
	winCount: { type: Number },
	requirements: { type: Object },
	endTime: { type: String },
	host: { type: String },
	desc: { type: String } // Giveaway Embed Desc
})

exports.default = mongoose_1.default.model('Giveaway-Systems', gw);
