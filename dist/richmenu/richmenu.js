"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var path_1 = __importDefault(require("path"));
var BLOCK_WIDTH = 1200 / 4;
module.exports = {
    meta: {
        image: {
            type: 'file',
            path: path_1.default.resolve(__dirname, 'AB_richmenu_C.png'),
        },
    },
    richmenu: {
        size: {
            width: 2500,
            height: 843
        },
        selected: true,
        name: "Controller",
        chatBarText: "幫你找直播！",
        areas: [
            {
                bounds: {
                    x: 0,
                    y: 0,
                    width: 625,
                    height: 843
                },
                action: {
                    type: "message",
                    text: "follow"
                }
            },
            {
                bounds: {
                    x: 625,
                    y: 0,
                    width: 625,
                    height: 843
                },
                action: {
                    type: "message",
                    text: "top"
                }
            },
            {
                bounds: {
                    x: 1250,
                    y: 0,
                    width: 625,
                    height: 843
                },
                action: {
                    type: "message",
                    text: "help"
                }
            },
            {
                bounds: {
                    x: 1875,
                    y: 0,
                    width: 625,
                    height: 843
                },
                action: {
                    type: "uri",
                    uri: "https://liff.line.me/1653917374-QqknRPqk"
                }
            }
        ]
    }
};
