import { UserModel } from '../../model/user';
import TwitchClient from 'twitch';
export default async function userFollow(context: any): Promise<void> {
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

  let output: string = '';
  streams.forEach(stream => {
    const ch = stream.channel;
    output += `
    直播主:${ch.displayName}
    狀態:${ch.status}
    遊戲:${ch.game}
    網址:${ch.url}
    何時開台:${stream.startDate}
    人數:${stream.viewers}
    ---------------
    `;
  });
  console.log(output);
  // 看平台去發送 streams
}
