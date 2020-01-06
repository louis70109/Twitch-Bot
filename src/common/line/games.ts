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
          aspectMode: 'cover',
          aspectRatio: '150:196',
          gravity: 'center',
          flex: 1,
        },
        body: {
          type: 'box',
          layout: 'baseline',
          contents: [
            {
              type: 'text',
              text: element.name,
              weight: 'bold',
              size: 'xl',
              wrap: true,
            },
          ],
          spacing: 'xl',
          margin: 'lg',
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
                type: 'message',
                label: '看這個',
                text: `我要看 ${element.name}`,
              },
            },
          ],
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
