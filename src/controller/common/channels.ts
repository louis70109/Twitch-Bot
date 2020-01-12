import { Stream } from 'twitch';
import mongoose from 'mongoose';
import showChannelsFlex from '../../view/line/streams';
import showStreamGeneric from '../../view/messenger/streams';
import sendMessage from '../../view/common/sendMessage';
export default async function showChannels(
  context,
  platform: string,
  streams: Stream[]
): Promise<void> {
  switch (platform) {
    case 'line':
      streams.length !== 0
        ? showChannelsFlex(context, streams)
        : sendMessage(context, '🚀現在追隨的實況主都沒開哦！');
      break;
    case 'messenger':
      streams.length !== 0
        ? showStreamGeneric(context, streams)
        : sendMessage(context, '🚀現在追隨的實況主都沒開哦！');
      break;
    default:
      let output = '';
      streams.forEach((element, index) => {
        if (index < 10) {
          const ch = element.channel;
          output += `
              直播主:${ch.displayName}
              狀態:${ch.status}
              遊戲:${ch.game}
              網址:${ch.url}
              何時開台:${element.startDate}
              人數:${element.viewers}
              圖片:${element.getPreviewUrl('large')}
              ---------------
            `;
        }
      });
      await context.sendText(output);
      break;
  }

  await mongoose.connection.close();
}
