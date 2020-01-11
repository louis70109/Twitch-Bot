"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var sendMessage_1 = __importDefault(require("./sendMessage"));
function helpMe(context) {
    var message = '🎮 輸入範例\n綁帳號: 綁定 sam1268\n查詢追隨: follow\n找遊戲: top';
    sendMessage_1.default(context, message);
}
exports.default = helpMe;
