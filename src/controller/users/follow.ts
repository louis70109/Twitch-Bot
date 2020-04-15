import TwitchClient, { UserFollow } from 'twitch';
import { StreamNotifyModel } from '../../model/notify';
import { UserModel } from '../../model/user';
import showChannels from '../common/Channels';

async function _findStreamNotifyList(
  userId: string,
  streams: any
): Promise<string[]> {
  const $notify: any = await StreamNotifyModel.find({ userId: userId });
  const userBindingStreams: Array<string> = [];
  for (let idx = 0; idx < streams.length; idx++) {
    for (let n_idx = 0; n_idx < $notify.length; n_idx++) {
      if (streams[idx].channel.name === $notify[n_idx].name) {
        userBindingStreams.push($notify[n_idx].name);
        break;
      }
    }
  }
  return await userBindingStreams;
}

async function _collectChannelIdList(follows: UserFollow[]): Promise<string[]> {
  const channel: string[] = [];

  for (let i = 0; i < follows.length; i++) {
    const follow = follows[i];
    channel.push(follow.channel.id);
  }
  return await channel;
}

export default async function userFollow(context: any): Promise<void> {
  const platform: string = context._session?.platform;
  const userId: string = context._session?.user?.id;

  const twitchClient = await TwitchClient.withCredentials(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
  );

  const $currentUser: any = await UserModel.findOne({ userId: userId });
  if (!$currentUser) {
    context.sendText('👾 請先綁定帳號哦！\n ex: 綁定 godjj');
    return;
  }
  const follows: UserFollow[] = await twitchClient.kraken.users.getFollowedChannels(
    $currentUser.twitchId
  );
  const channel: string[] = await _collectChannelIdList(follows);
  const streams: any = await twitchClient.kraken.streams.getStreams(channel);

  const userBindingStreams: string[] = await _findStreamNotifyList(
    userId,
    streams
  );
  showChannels(context, platform, streams, userBindingStreams);
}
