import { Game } from '../../model/game';

export default async function showGamesGeneric(
  context: any,
  games: Game[]
): Promise<void> {
  const channelBubble: any[] = [];
  games.forEach((element, index) => {
    if (index < 12) {
      console.log(element);
      const content = {
        title: element.name,
        imageUrl: element.boxArtUrl,
        subtitle: '',
        defaultAction: {
          type: 'web_url',
          messengerExtensions: true,
          webviewHeightRatio: 'tall',
        },
        buttons: [
          {
            type: 'postback',
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
