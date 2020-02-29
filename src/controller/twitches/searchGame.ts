import TwitchClient from 'twitch';
import { Stream } from 'twitch';
import showChannels from '../common/Channels';

export default async function searchGame(
  context: any,
  { match }
): Promise<void> {
  const platform = context._session?.platform;
  const topic = match.groups?.topic;
  const twitchClient = await TwitchClient.withCredentials(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
  );
  const gamesInfo = await twitchClient.kraken.streams.getStreams('', topic);

  const streams: Stream[] = [];
  gamesInfo.forEach((element, index) => {
    if (index < 10) {
      streams.push(element);
    }
  });
  showChannels(context, platform, streams, []);
}
