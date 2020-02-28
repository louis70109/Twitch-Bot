function toTextAction(text): any {
  return {
    contentType: 'text',
    title: text,
    payload: text,
  };
}

export default function quickReplies(textOrTexts): any {
  const texts = Array.isArray(textOrTexts) ? textOrTexts : [textOrTexts];

  return {
    quickReplies: texts.map(toTextAction),
  };
}
