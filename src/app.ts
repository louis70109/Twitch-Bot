import TwitchClient from 'twitch';
import { Stream } from 'stream';
import { router, text } from 'bottender/router';
import userBinding from './controller/users/binding';

async function getFollow(userName: string) {
  const twitchClient = await TwitchClient.withCredentials(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
  );

  const user = await twitchClient.helix.users.getUserByName(userName);

  if (!user) {
    return false;
  }
  const follow = await twitchClient.kraken.users.getFollowedChannels(user);
  let channel: string[] = [];
  for (let index = 0; index < follow.length; index++) {
    const element = follow[index];
    channel.push(element.channel.id);
  }

  return (await twitchClient.kraken.streams.getStreams(channel)) || [];
}

export default async function App(context: any): Promise<void> {
  // await getFollow('louis70109');
  return router([
    text(/^綁定(?<name>[\s\S]+)/, userBinding),
    // text('*', debug),
  ]);
}
