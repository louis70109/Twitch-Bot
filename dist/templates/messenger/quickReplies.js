"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toTextAction(text) {
    return {
        contentType: 'text',
        title: text,
        payload: text,
    };
}
function quickReplies(textOrTexts) {
    var texts = Array.isArray(textOrTexts) ? textOrTexts : [textOrTexts];
    return {
        quickReplies: texts.map(toTextAction),
    };
}
exports.default = quickReplies;
