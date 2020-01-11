import quickReply from '../line/quickReply';
import quickReplies from '../messenger/quickReplies';
export default async function sendMessage(context, message): Promise<void> {
  const platform = context._session?.platform;

  switch (platform) {
    case 'line':
      await context.sendText(
        message,
        quickReply(['follow', 'top', 'help', 'author'])
      );
      break;
    case 'messenger':
      // showStreamGeneric(context, streams);
      await context.sendText(
        message,
        quickReplies(['follow', 'top', 'help', 'author'])
      );
      break;
    default:
      await context.sendText(message);
      break;
  }
}
