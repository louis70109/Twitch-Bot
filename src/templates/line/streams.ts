import { Stream } from 'twitch';

const LINE_FLEX_LIMIT = 10;
export default async function showChannelsFlex(
  context: any,
  streams: Stream[],
  notification: Array<string>
): Promise<void> {
  const channelBubble: any[] = [];

  streams.forEach((element, index) => {
    if (index < LINE_FLEX_LIMIT) {
      const ch = element.channel;
      const content: any = {
        type: 'bubble',
        hero: {
          type: 'image',
          url: element.getPreviewUrl('large'),
          size: 'full',
          aspectMode: 'cover',
          aspectRatio: '150:196',
          gravity: 'center',
          flex: 1,
        },
        body: {
          type: 'box',
          layout: 'vertical',
          spacing: 'xl',
          margin: 'lg',
          contents: [
            {
              type: 'box',
              layout: 'horizontal',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'image',
                      url: ch.logo,
                      aspectMode: 'cover',
                      size: 'full',
                    },
                  ],
                  cornerRadius: '100px',
                  width: '72px',
                  height: '72px',
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      margin: 'md',
                      contents: [
                        {
                          type: 'text',
                          text: `${ch.displayName}`,
                          weight: 'bold',
                          color: '#000000',
                          size: 'sm',
                        },
                      ],
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      margin: 'md',
                      contents: [
                        {
                          type: 'text',
                          text: `追隨: ${ch.followers}`,
                          size: 'sm',
                          color: '#000000',
                        },
                      ],
                    },
                    {
                      type: 'box',
                      layout: 'baseline',
                      spacing: 'sm',
                      margin: 'md',
                      contents: [
                        {
                          type: 'text',
                          text: `觀看: ${element.viewers}`,
                          size: 'sm',
                          color: '#000000',
                        },
                      ],
                    },
                  ],
                },
              ],
              spacing: 'xl',
              paddingAll: '20px',
            },
            {
              type: 'text',
              text: `☘️ ${ch.status}`,
              size: 'sm',
            },
            {
              type: 'text',
              text: `🎮 ${ch.game}`,
              size: 'sm',
            },
          ],
        },
        footer: {
          type: 'box',
          layout: 'vertical',
          spacing: 'sm',
          contents: [
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
        },
      };
      if (notification.includes(String(ch.name))) {
        content.footer.contents.push({
          type: 'button',
          style: 'secondary',
          action: {
            type: 'message',
            label: '取消綁定',
            text: `解除 ${ch.name}`,
          },
        });
      } else {
        content.footer.contents.push({
          type: 'button',
          style: 'primary',
          action: {
            type: 'message',
            label: '綁定通知',
            text: `綁定推播 ${ch.name}`,
          },
        });
      }
      channelBubble.push(content);
    }
  });

  await context.sendFlex('來看直播囉！', {
    type: 'carousel',
    contents: channelBubble,
  });
}
