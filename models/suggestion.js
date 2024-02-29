"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
/**
 * Schema for suggestion documents.
 *
 * @typedef {Object} Suggestion
 * @property {string} message - The text of the suggestion.
 * @property {string} author - The author of the suggestion.
 * @property {string[]} votes - Array of user IDs who voted for the suggestion.
 */
var suggest = new mongoose_1.default.Schema({
	message: { type: String },
	author: { type: String },
	votes: { type: Array() } // Array of votes
})
exports.default = mongoose_1.default.model('Suggest-Systems', suggest);
