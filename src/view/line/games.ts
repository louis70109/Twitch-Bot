import { Game } from '../../model/game';
import quickReply from './quickReply';

const LINE_FLEX_LIMIT = 10;
export default async function showGamesFlex(
  context: any,
  games: Game[]
): Promise<void> {
  const channelBubble: any[] = [];

  games.forEach((element, index) => {
    if (index < LINE_FLEX_LIMIT) {
      const content = {
        type: 'bubble',
        body: {
          type: 'box',
          layout: 'vertical',
          contents: [
            {
              type: 'image',
              url: element.boxArtUrl,
              size: 'full',
              aspectMode: 'cover',
              aspectRatio: '2:3',
              gravity: 'center',
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'text',
                      text: element.name,
                      size: 'xl',
                      color: '#ffffff',
                      weight: 'bold',
                    },
                  ],
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  contents: [
                    {
                      type: 'box',
                      layout: 'vertical',
                      contents: [
                        {
                          type: 'button',
                          style: 'link',
                          color: '#ffffff',
                          action: {
                            type: 'message',
                            label: '我要找...',
                            text: `find ${element.name}`,
                          },
                        },
                      ],
                    },
                  ],
                  borderWidth: '1px',
                  cornerRadius: '4px',
                  spacing: 'sm',
                  borderColor: '#ffffff',
                  margin: 'xxl',
                  height: '40px',
                },
              ],
              position: 'absolute',
              offsetBottom: '0px',
              offsetStart: '0px',
              offsetEnd: '0px',
              backgroundColor: '#03303Acc',
              paddingAll: '20px',
              paddingTop: '18px',
            },
            {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'GAME',
                  color: '#ffffff',
                  align: 'center',
                  size: 'xs',
                  offsetTop: '3px',
                },
              ],
              position: 'absolute',
              cornerRadius: '20px',
              offsetTop: '18px',
              backgroundColor: '#6441a5',
              offsetStart: '18px',
              height: '25px',
              width: '53px',
            },
          ],
          paddingAll: '0px',
        },
      };
      channelBubble.push(content);
    }
  });

  await context.sendFlex(
    '來看直播囉！',
    {
      type: 'carousel',
      contents: channelBubble,
    },
    quickReply(['follow', 'top', 'help', 'author'])
  );
}
