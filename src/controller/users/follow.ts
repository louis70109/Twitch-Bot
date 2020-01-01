import { UserModel } from '../../model/user';
import TwitchClient from 'twitch';
import mongoose from 'mongoose';
import FollowFlex from '../../template/line/users/follow';
import FollowGeneric from '../../template/messenger/users/follow';
export default async function userFollow(context: any): Promise<void> {
  const platform = context._session?.platform;
  const userId = context._session?.user?.id;

  const twitchClient = await TwitchClient.withCredentials(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
  );

  const currentUser = await UserModel.findOne({ userId: userId });

  const follow = await twitchClient.kraken.users.getFollowedChannels(
    currentUser.twitchId
  );
  let channel: string[] = [];
  for (let index = 0; index < follow.length; index++) {
    const element = follow[index];
    channel.push(element.channel.id);
  }
  const streams = await twitchClient.kraken.streams.getStreams(channel);
  if (streams.length === 0)
    await context.sendText('🚀現在追隨的實況主都沒開哦！');
  else {
    switch (platform) {
      case 'line':
        FollowFlex(context, streams);
        break;
      case 'messenger':
        FollowGeneric(context, streams);
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
