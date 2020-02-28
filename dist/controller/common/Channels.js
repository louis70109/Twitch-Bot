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
var streams_1 = __importDefault(require("../../templates/line/streams"));
var streams_2 = __importDefault(require("../../templates/messenger/streams"));
var sendMessage_1 = __importDefault(require("../../templates/common/sendMessage"));
function showChannels(context, platform, streams) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, output_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _a = platform;
                    switch (_a) {
                        case 'line': return [3 /*break*/, 1];
                        case 'messenger': return [3 /*break*/, 2];
                    }
                    return [3 /*break*/, 3];
                case 1:
                    streams.length !== 0
                        ? streams_1.default(context, streams)
                        : sendMessage_1.default(context, '🚀現在追隨的實況主都沒開哦！');
                    return [3 /*break*/, 5];
                case 2:
                    streams.length !== 0
                        ? streams_2.default(context, streams)
                        : sendMessage_1.default(context, '🚀現在追隨的實況主都沒開哦！');
                    return [3 /*break*/, 5];
                case 3:
                    output_1 = '';
                    streams.forEach(function (element, index) {
                        if (index < 10) {
                            var ch = element.channel;
                            output_1 += "\n              \u76F4\u64AD\u4E3B:" + ch.displayName + "\n              \u72C0\u614B:" + ch.status + "\n              \u904A\u6232:" + ch.game + "\n              \u7DB2\u5740:" + ch.url + "\n              \u4F55\u6642\u958B\u53F0:" + element.startDate + "\n              \u4EBA\u6578:" + element.viewers + "\n              \u5716\u7247:" + element.getPreviewUrl('large') + "\n              ---------------\n            ";
                        }
                    });
                    return [4 /*yield*/, context.sendText(output_1)];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.default = showChannels;
