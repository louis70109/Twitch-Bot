import { UserModel } from '../../model/user';
import TwitchClient from 'twitch';
import showChannels from '../common/Channels';
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
  const channel: string[] = [];
  for (let index = 0; index < follow.length; index++) {
    const element = follow[index];
    channel.push(element.channel.id);
  }
  const streams = await twitchClient.kraken.streams.getStreams(channel);
  showChannels(context, platform, streams);
}
