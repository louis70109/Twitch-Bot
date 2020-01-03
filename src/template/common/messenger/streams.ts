export default async function showStreamGeneric(
  context: any,
  streams
): Promise<void> {
  let channelBubble: any[] = [];

  streams.forEach(stream => {
    const ch = stream.channel;
    const content = {
      title: ch.displayName,
      imageUrl: stream.getPreviewUrl('large'),
      subtitle: `💬${ch.status}\n🎮${ch.game}\n🦈${stream.viewers}`,
      defaultAction: {
        type: 'web_url',
        url: ch.url,
        messengerExtensions: true,
        webviewHeightRatio: 'tall',
        fallbackUrl: stream.getPreviewUrl('large'),
      },
      buttons: [
        {
          type: 'web_url',
          url: ch.url,
          title: '看直播',
        },
      ],
    };
    channelBubble.push(content);
  });
  await context.sendGenericTemplate(channelBubble);
}
