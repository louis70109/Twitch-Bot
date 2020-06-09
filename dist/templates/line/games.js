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
Object.defineProperty(exports, "__esModule", { value: true });
var IconSwitch_1 = require("../../utils/IconSwitch");
var LINE_FLEX_LIMIT = 10;
function showGamesFlex(context, games) {
    return __awaiter(this, void 0, void 0, function () {
        var channelBubble, sender;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    channelBubble = [];
                    games.forEach(function (element, index) {
                        if (index < LINE_FLEX_LIMIT) {
                            var content = {
                                type: 'bubble',
                                body: {
                                    type: 'box',
                                    layout: 'vertical',
                                    contents: [
                                        {
                                            type: 'image',
                                            url: element.boxArtUrl,
                                            size: 'full',
                                            aspectMode: 'cover',
                                            aspectRatio: '150:250',
                                            gravity: 'top',
                                        },
                                        {
                                            type: 'box',
                                            layout: 'vertical',
                                            contents: [
                                                {
                                                    type: 'box',
                                                    layout: 'vertical',
                                                    contents: [
                                                        {
                                                            type: 'text',
                                                            text: element.name,
                                                            size: 'xl',
                                                            color: '#ffffff',
                                                            weight: 'bold',
                                                        },
                                                    ],
                                                },
                                                {
                                                    type: 'box',
                                                    layout: 'vertical',
                                                    contents: [
                                                        {
                                                            type: 'box',
                                                            layout: 'vertical',
                                                            contents: [
                                                                {
                                                                    type: 'button',
                                                                    style: 'link',
                                                                    color: '#ffffff',
                                                                    action: {
                                                                        type: 'message',
                                                                        label: '我要找...',
                                                                        text: "find " + element.name,
                                                                    },
                                                                },
                                                            ],
                                                        },
                                                    ],
                                                    borderWidth: '1px',
                                                    cornerRadius: '4px',
                                                    spacing: 'sm',
                                                    borderColor: '#ffffff',
                                                    margin: 'xxl',
                                                    height: '50px',
                                                },
                                            ],
                                            position: 'absolute',
                                            offsetBottom: '0px',
                                            offsetStart: '0px',
                                            offsetEnd: '0px',
                                            backgroundColor: '#03303Acc',
                                            paddingAll: '20px',
                                            paddingTop: '18px',
                                        },
                                        {
                                            type: 'box',
                                            layout: 'vertical',
                                            contents: [
                                                {
                                                    type: 'text',
                                                    text: 'GAME',
                                                    color: '#ffffff',
                                                    align: 'center',
                                                    size: 'xs',
                                                    offsetTop: '3px',
                                                },
                                            ],
                                            position: 'absolute',
                                            cornerRadius: '20px',
                                            offsetTop: '18px',
                                            backgroundColor: '#6441a5',
                                            offsetStart: '18px',
                                            height: '25px',
                                            width: '53px',
                                        },
                                    ],
                                    paddingAll: '0px',
                                },
                            };
                            channelBubble.push(content);
                        }
                    });
                    sender = IconSwitch_1.randomSticker();
                    return [4 /*yield*/, context.sendFlex('來看直播囉！', {
                            type: 'carousel',
                            contents: channelBubble,
                        }, { sender: sender })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = showGamesFlex;
