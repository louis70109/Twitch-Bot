export default async function sendMessage(context, message): Promise<void> {
  const platform = context._session?.platform;

  switch (platform) {
    case 'line':
      await context.sendText(message);
      break;
    default:
      await context.sendText(message);
      break;
  }
}
