"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GlobalShop = new mongoose_1.default.Schema({
    Id: {
        type: String,
        default: null
    },
    shopItems: {
        type: Array,
        default: []
    },
    weeklyAmt: {
        type: Number,
        default: 10000
    },
    dailyAmt: {
        type: Number,
        default: 2000
    }
});
exports.default = mongoose_1.default.model('GlobalShop', GlobalShop);
