import { Game } from '../../model/game';
const MESSENGER_LIMIT = 10;
export default async function showGamesGeneric(
  context: any,
  games: Game[]
): Promise<void> {
  const channelBubble: any[] = [];
  games.forEach((element, index) => {
    if (index < MESSENGER_LIMIT) {
      const content = {
        title: `🦈 ${element.name}`,
        imageUrl: element.boxArtUrl,
        subtitle: '🎮🎮🎮🎮🎮🎮',
        defaultAction: {
          type: 'web_url',
          url: element.boxArtUrl,
          messengerExtensions: true,
          webviewHeightRatio: 'tall',
          fallbackUrl: element.boxArtUrl,
        },
        buttons: [
          {
            type: 'postback',
            title: `看這個`,
            payload: `${element.name}`,
          },
        ],
      };
      channelBubble.push(content);
    }
  });
  await context.sendGenericTemplate(channelBubble);
}
