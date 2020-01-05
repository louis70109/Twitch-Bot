import mongoose from 'mongoose';
import showGamesFlex from '../../common/line/games';
import showStreamGeneric from '../../common/messenger/streams';
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
        showStreamGeneric(context, games);
        break;
      default:
        let output = '';
        const streamLength = games.length ? games.length < 12 : 12;
        for (let index = 0; index < streamLength; index++) {
          const ch = games[index].channel;
          output += `
          直播主:${ch.displayName}
          狀態:${ch.status}
          遊戲:${ch.game}
          網址:${ch.url}
          何時開台:${games[index].startDate}
          人數:${games[index].viewers}
          圖片:${games[0].getPreviewUrl('large')}
          ---------------
        `;
        }
        await context.sendText(output);
        break;
    }

    await mongoose.connection.close();
  }
}
