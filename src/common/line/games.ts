import { Game } from '../../model/game';
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
        hero: {
          type: 'image',
          url: element.boxArtUrl,
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
              text: element.name,
              weight: 'bold',
              size: 'xl',
              wrap: true,
            },

            {
              type: 'button',
              style: 'primary',
              action: {
                type: 'message',
                label: element.name,
                text: `我要看 ${element.name}`,
              },
            },
          ],
          spacing: 'sm',
          paddingAll: '8px',
        },
      };

      channelBubble.push(content);
    }
  });

  await context.sendFlex('來看直播囉！', {
    type: 'carousel',
    contents: channelBubble,
  });
}
