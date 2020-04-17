import TwitchClient, { UserFollow, Stream } from 'twitch';
import { Notify, StreamNotifyModel } from '../../model/notify';
import { UserModel, User } from '../../model/user';
import showChannels from '../common/Channels';

async function _findStreamNotifyList(
  userId: string,
  streams: Stream[]
): Promise<string[]> {
  const $notify: Notify[] = await StreamNotifyModel.find({ userId: userId });
  const streamNameList: string[] = streams.map(el => el.channel.name);
  const notifyList: string[] = $notify.map(el => el.name);
  return await notifyList.filter(el => streamNameList.indexOf(el));
}

async function _collectChannelIdList(follows: UserFollow[]): Promise<string[]> {
  return follows.map(element => element.channel.id);
}

export default async function userFollow(context: any): Promise<void> {
  const platform: string = context._session?.platform;
  const userId: string = context._session?.user?.id;

  const twitchClient = await TwitchClient.withCredentials(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
  );

  const $currentUser: User = await UserModel.findOne({ userId: userId });
  if (!$currentUser) {
    context.sendText('👾 請先綁定帳號哦！\n ex: 綁定 godjj');
    return;
  }
  const follows: UserFollow[] = await twitchClient.kraken.users.getFollowedChannels(
    $currentUser.twitchId
  );
  const channel: string[] = await _collectChannelIdList(follows);
  const streams: Stream[] = await twitchClient.kraken.streams.getStreams(
    channel
  );

  const userBindingStreams: string[] = await _findStreamNotifyList(
    userId,
    streams
  );
  showChannels(context, platform, streams, userBindingStreams);
}
