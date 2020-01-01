export default async function FollowFlex(context: any, streams): Promise<void> {
  let channelBubble: any[] = [];

  streams.forEach(stream => {
    const ch = stream.channel;
    const content = {
      type: 'bubble',
      hero: {
        type: 'image',
        url: stream.getPreviewUrl('large'),
        size: 'full',
        aspectRatio: '20:13',
        aspectMode: 'cover',
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: ch.displayName,
            weight: 'bold',
            size: 'xl',
            wrap: true,
          },
          {
            type: 'text',
            text: `🎮${ch.game}`,
            size: 'sm',
          },
          {
            type: 'text',
            text: `💬${stream.viewers}`,
            size: 'sm',
            wrap: true,
          },
          {
            type: 'button',
            style: 'primary',
            action: {
              type: 'uri',
              label: '看直播',
              uri: ch.url,
            },
          },
        ],
        spacing: 'sm',
        paddingAll: '8px',
      },
    };
    channelBubble.push(content);
  });
  await context.sendFlex('來看直播囉！', {
    type: 'carousel',
    contents: channelBubble,
  });
}
