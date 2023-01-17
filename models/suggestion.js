"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var suggest = new mongoose_1.default.Schema({
    message: { type: String },
    author: { type: String },
    votes: { type: Array() } // Array of votes
});
exports.default = mongoose_1.default.model('Suggest-Systems', suggest);
