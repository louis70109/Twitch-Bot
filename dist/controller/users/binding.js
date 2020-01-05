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
function userBinding(context, _a) {
    var match = _a.match;
    var _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var userName, userId, twitchClient, twitchUser, user, isAlive, userObj;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    userName = (_b = match.groups) === null || _b === void 0 ? void 0 : _b.name;
                    userId = (_d = (_c = context._session) === null || _c === void 0 ? void 0 : _c.user) === null || _d === void 0 ? void 0 : _d.id;
                    return [4 /*yield*/, twitch_1.default.withCredentials(process.env.TWITCH_CLIENT_ID, process.env.TWITCH_ACCESS_TOKEN)];
                case 1:
                    twitchClient = _e.sent();
                    return [4 /*yield*/, twitchClient.helix.users.getUserByName(userName)];
                case 2:
                    twitchUser = _e.sent();
                    if (!twitchUser) {
                        context.sendText('👾 綁定帳號失敗，請檢查 Twitch 是否有效');
                        return [2 /*return*/];
                    }
                    user = new user_1.UserModel();
                    user.name = twitchUser.name;
                    user.displayName = twitchUser.displayName;
                    user.twitchId = twitchUser.id;
                    user.userId = userId;
                    return [4 /*yield*/, user_1.UserModel.findOne({ userId: userId })];
                case 3:
                    isAlive = _e.sent();
                    if (!!isAlive) return [3 /*break*/, 5];
                    console.log('this record not found');
                    return [4 /*yield*/, user.save(function (err) {
                            if (err) {
                                context.sendText('❌ 綁定失敗');
                                return;
                            }
                        })];
                case 4:
                    _e.sent();
                    return [3 /*break*/, 7];
                case 5:
                    console.log('Find record, update...');
                    userObj = {
                        name: twitchUser.name,
                        displayName: twitchUser.displayName,
                        twitchId: twitchUser.id,
                        userId: userId,
                    };
                    return [4 /*yield*/, user_1.UserModel.findOneAndUpdate({ userId: userId }, userObj, function (err, res) {
                            if (!err)
                                console.log('帳戶更新成功', res);
                            mongoose_1.default.connection.close();
                        })];
                case 6:
                    _e.sent();
                    _e.label = 7;
                case 7: return [4 /*yield*/, context.sendText("\u2705 \u7D81\u5B9A " + twitchUser.name + " \u6210\u529F\uFF01")];
                case 8:
                    _e.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = userBinding;
