import { Stream } from 'twitch';
import showChannelsFlex from '../../templates/line/streams';
export default async function showChannels(
  context,
  platform: string,
  streams: Stream[],
  notification: Array<string>
): Promise<void> {
  switch (platform) {
    case 'line':
      streams.length !== 0
        ? showChannelsFlex(context, streams, notification)
        : context.sendText('🚀現在追隨的實況主都沒開哦！');
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
}
