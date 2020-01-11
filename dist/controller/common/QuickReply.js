"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var quickReply_1 = __importDefault(require("../../view/line/quickReply"));
function sendQuickReply(platform) {
    console.log('==============');
    console.log(platform);
    switch (platform) {
        case 'line':
            quickReply_1.default(['follow', 'top', 'help', 'author']);
            break;
        case 'messenger':
            // showGamesGeneric(context, games);
            break;
        default:
            console.log(['follow', 'top', 'help', 'author']);
            break;
    }
}
exports.default = sendQuickReply;
