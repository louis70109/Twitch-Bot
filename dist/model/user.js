"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var UserSchema = new Schema({
    name: { type: String },
    displayName: { type: String },
    twitchId: { type: String, index: true },
    createAt: { type: Date, default: Date.now },
    userId: { type: String, unique: true, index: true },
});
var UserModel = mongoose_1.default.model('user', UserSchema);
exports.UserModel = UserModel;
