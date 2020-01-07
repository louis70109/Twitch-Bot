import mongoose from 'mongoose';
import showGamesFlex from '../../common/line/games';
import showGamesGeneric from '../../common/messenger/Games';
import { Game } from '../../model/game';
export default async function showGames(
  context,
  platform: string,
  games: Game[]
): Promise<void> {
  if (games.length === 0)
    await context.sendText('🚀現在追隨的實況主都沒開哦！');
  else {
    switch (platform) {
      case 'line':
        showGamesFlex(context, games);
        break;
      case 'messenger':
        showGamesGeneric(context, games);
        break;
      default:
        await context.sendText(games);
        break;
    }

    await mongoose.connection.close();
  }
}
