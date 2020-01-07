export default async function showStreamGeneric(
  context: any,
  streams
): Promise<void> {
  const channelBubble: any[] = [];
  streams.forEach((element, index) => {
    if (index < 12) {
      const ch = element.channel;
      const content = {
        title: ch.displayName,
        imageUrl: element.getPreviewUrl('large'),
        subtitle: `☘️${ch.status}\n🎮${ch.game}\n🦈${element.viewers}`,
        defaultAction: {
          type: 'web_url',
          url: ch.url,
          messengerExtensions: true,
          webviewHeightRatio: 'tall',
          fallbackUrl: element.getPreviewUrl('large'),
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
    }
  });
  await context.sendGenericTemplate(channelBubble);
}
