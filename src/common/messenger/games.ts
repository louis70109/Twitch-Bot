import { Game } from '../../model/game';

export default async function showGamesGeneric(
  context: any,
  games: Game[]
): Promise<void> {
  const channelBubble: any[] = [];
  games.forEach((element, index) => {
    if (index < 12) {
      const content = {
        title: element.name,
        imageUrl: element.boxArtUrl,
        defaultAction: {
          type: 'web_url',
          url: element.boxArtUrl,
          messengerExtensions: true,
          webviewHeightRatio: 'tall',
          fallbackUrl: element.boxArtUrl,
        },
        buttons: [
          {
            type: 'web_url',
            title: '找直播',
            payload: `我要看 ${element.name}`,
          },
        ],
      };
      channelBubble.push(content);
    }
  });
  await context.sendGenericTemplate(channelBubble);
}
