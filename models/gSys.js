"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
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
});
exports.default = mongoose_1.default.model('Giveaway-Systems', gw);
