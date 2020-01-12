import TwitchClient from 'twitch';
import showGames from '../common/Games';
import { Game } from '../../model/game';

function replacePreviewUrlToLarge(url: string): string {
  return url.replace(/\{width\}x\{height\}/, '480x360');
}
export default async function topGames(context: any): Promise<void> {
  const platform = context._session?.platform;

  const twitchClient = await TwitchClient.withCredentials(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
  );

  const games = await twitchClient.helix.games.getTopGames();
  const gamesInfo: Game[] = [];
  games.data.forEach((element, index) => {
    if (index < 10) {
      const _tmpGame: Game = {
        id: element.id,
        name: element.name,
        boxArtUrl: element.boxArtUrl,
      };
      _tmpGame.boxArtUrl = replacePreviewUrlToLarge(element.boxArtUrl);
      gamesInfo.push(_tmpGame);
    }
  });
  showGames(context, platform, gamesInfo);
}
