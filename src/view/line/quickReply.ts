function toTextAction(text): any {
  return {
    type: 'action',
    action: {
      type: 'message',
      label: text,
      text: text,
    },
  };
}

export default function quickReply(textOrTexts) {
  const texts = Array.isArray(textOrTexts) ? textOrTexts : [textOrTexts];
  return {
    quickReply: {
      items: texts.map(toTextAction),
    },
  };
}
