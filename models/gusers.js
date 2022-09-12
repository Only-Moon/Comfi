"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GMemberData = new mongoose_1.default.Schema({
    userID: {
        type: String,
        default: null
    },
    wallet: {
        type: Number,
        default: 0
    },
    bank: {
        type: Number,
        default: 0
    },
    lastUsedDaily: {
        type: Date,
        default: null
    },
    lastUsedWeekly: {
        type: Date,
        default: null
    },
    inventory: {
        type: Array,
        default: []
    },
    job: {
        type: String,
        default: null
    },
    salary: {
        type: Number,
        default: 0
    },
    lastUsedWork: {
        type: Date,
        default: null
    },
    jobLeft: {
       type: Date,
       default: null
    }
});
exports.default = mongoose_1.default.model('GlobalMemberData', GMemberData);
