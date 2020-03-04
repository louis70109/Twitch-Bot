"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var NotifySchema = new Schema({
    token: { type: String },
    userId: { type: String, unique: true, index: true },
});
var StreamNotifySchema = new Schema({
    name: { type: String, required: true },
    userId: { type: String, index: true },
}, { timestamps: { updatedAt: 'createdAt' } });
StreamNotifySchema.index({ name: 1, userId: 1 }, { unique: true });
var NotifyModel = mongoose_1.default.model('notify', NotifySchema);
exports.NotifyModel = NotifyModel;
var StreamNotifyModel = mongoose_1.default.model('stream_notify', StreamNotifySchema);
exports.StreamNotifyModel = StreamNotifyModel;
