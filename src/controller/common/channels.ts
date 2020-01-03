import { Stream } from 'twitch';
import mongoose from 'mongoose';
import showChannelsFlex from '../../template/common/line/streams';
import showStreamGeneric from '../../template/common/messenger/streams';
export default async function showChannels(
  context,
  platform: string,
  streams: Stream[]
): Promise<void> {
  if (streams.length === 0)
    await context.sendText('🚀現在追隨的實況主都沒開哦！');
  else {
    switch (platform) {
      case 'line':
        showChannelsFlex(context, streams);
        break;
      case 'messenger':
        showStreamGeneric(context, streams);
        break;
      default:
        let output = '';
        for (let index = 0; index < 5; index++) {
          const ch = streams[index].channel;
          output += `
          直播主:${ch.displayName}
          狀態:${ch.status}
          遊戲:${ch.game}
          網址:${ch.url}
          何時開台:${streams[index].startDate}
          人數:${streams[index].viewers}
          圖片:${streams[0].getPreviewUrl('large')}
          ---------------
        `;
        }
        await context.sendText(output);
        break;
    }

    await mongoose.connection.close();
  }
}
