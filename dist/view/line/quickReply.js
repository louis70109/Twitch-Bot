"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toTextAction(text) {
    return {
        type: 'action',
        action: {
            type: 'message',
            label: text,
            text: text,
        },
    };
}
function quickReply(textOrTexts) {
    var texts = Array.isArray(textOrTexts) ? textOrTexts : [textOrTexts];
    return {
        quickReply: {
            items: texts.map(toTextAction),
        },
    };
}
exports.default = quickReply;
