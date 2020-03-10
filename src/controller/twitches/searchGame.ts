import TwitchClient from 'twitch';
import { Stream } from 'twitch';
import showChannels from '../common/Channels';

const { TWITCH_CLIENT_ID, TWITCH_ACCESS_TOKEN } = process.env;
export default async function searchGame(
  context: any,
  { match }
): Promise<void> {
  const platform = context._session?.platform;
  const topic = match.groups?.topic;
  const twitchClient = await TwitchClient.withCredentials(
    TWITCH_CLIENT_ID,
    TWITCH_ACCESS_TOKEN
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
