import TwitchClient from 'twitch';
import { UserModel } from '../../model/user';
import { StreamNotifyModel } from '../../model/notify';
import showChannels from '../common/Channels';
import sendMessage from '../../templates/common/sendMessage';

export default async function userFollow(context: any): Promise<void> {
  const platform = context._session?.platform;
  const userId = context._session?.user?.id;

  const twitchClient = await TwitchClient.withCredentials(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
  );

  const currentUser = await UserModel.findOne({ userId: userId });
  if (!currentUser) {
    sendMessage(context, '👾 請先綁定帳號哦！\n ex: 綁定 godjj');
    return;
  }
  const follow = await twitchClient.kraken.users.getFollowedChannels(
    currentUser.twitchId
  );
  const channel: string[] = [];
  follow.forEach(element => channel.push(element.channel.id));
  const streams = await twitchClient.kraken.streams.getStreams(channel);
  const notify = await StreamNotifyModel.find({ userId: userId });
  const binding_streams = [];
  for (let idx = 0; idx < streams.length; idx++) {
    for (let n_idx = 0; n_idx < notify.length; n_idx++) {
      if (streams[idx].channel.name === notify[n_idx].name) {
        binding_streams.push(notify[n_idx].name);
        break;
      }
    }
  }
  console.log(binding_streams);
  showChannels(context, platform, streams, binding_streams);
}
