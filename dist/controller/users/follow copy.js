"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("../../model/user");
var twitch_1 = __importDefault(require("twitch"));
var mongoose_1 = __importDefault(require("mongoose"));
var follow_1 = __importDefault(require("../../template/line/users/follow"));
var follow_2 = __importDefault(require("../../template/messenger/users/follow"));
function userFollow(context) {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function () {
        var platform, userId, twitchClient, currentUser, follow, channel, index, element, streams, _d, output, index, ch;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    platform = (_a = context._session) === null || _a === void 0 ? void 0 : _a.platform;
                    userId = (_c = (_b = context._session) === null || _b === void 0 ? void 0 : _b.user) === null || _c === void 0 ? void 0 : _c.id;
                    return [4 /*yield*/, twitch_1.default.withCredentials(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_ACCESS_TOKEN)];
                case 1:
                    twitchClient = _e.sent();
                    return [4 /*yield*/, user_1.UserModel.findOne({ userId: userId })];
                case 2:
                    currentUser = _e.sent();
                    return [4 /*yield*/, twitchClient.kraken.users.getFollowedChannels(currentUser.twitchId)];
                case 3:
                    follow = _e.sent();
                    channel = [];
                    for (index = 0; index < follow.length; index++) {
                        element = follow[index];
                        channel.push(element.channel.id);
                    }
                    return [4 /*yield*/, twitchClient.kraken.streams.getStreams(channel)];
                case 4:
                    streams = _e.sent();
                    if (!(streams.length === 0)) return [3 /*break*/, 6];
                    return [4 /*yield*/, context.sendText('🚀現在追隨的實況主都沒開哦！')];
                case 5:
                    _e.sent();
                    return [3 /*break*/, 13];
                case 6:
                    _d = platform;
                    switch (_d) {
                        case 'line': return [3 /*break*/, 7];
                        case 'messenger': return [3 /*break*/, 8];
                    }
                    return [3 /*break*/, 9];
                case 7:
                    follow_1.default(context, streams);
                    return [3 /*break*/, 11];
                case 8:
                    follow_2.default(context, streams);
                    return [3 /*break*/, 11];
                case 9:
                    output = '';
                    for (index = 0; index < 5; index++) {
                        ch = streams[index].channel;
                        output += "\n          \u76F4\u64AD\u4E3B:" + ch.displayName + "\n          \u72C0\u614B:" + ch.status + "\n          \u904A\u6232:" + ch.game + "\n          \u7DB2\u5740:" + ch.url + "\n          \u4F55\u6642\u958B\u53F0:" + streams[index].startDate + "\n          \u4EBA\u6578:" + streams[index].viewers + "\n          \u5716\u7247:" + streams[0].getPreviewUrl('large') + "\n          ---------------\n        ";
                    }
                    return [4 /*yield*/, context.sendText(output)];
                case 10:
                    _e.sent();
                    return [3 /*break*/, 11];
                case 11: return [4 /*yield*/, mongoose_1.default.connection.close()];
                case 12:
                    _e.sent();
                    _e.label = 13;
                case 13: return [2 /*return*/];
            }
        });
    });
}
exports.default = userFollow;
