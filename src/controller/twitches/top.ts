import TwitchClient from 'twitch';
import showChannels from '../common/channels';

export default async function topGames(context: any): Promise<void> {
  const platform = context._session?.platform;
  const gameName = context._session?.user?.id;

  const twitchClient = await TwitchClient.withCredentials(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
  );

  const games = await twitchClient.helix.games.getTopGames();
  let channels: string[] = [];
  games.data.forEach(element => {
    channels.push(element.name);
  });
  const gamesInfo = await twitchClient.kraken.streams.getStreams('', gameName);

  let streams: Stream[] = [];
  for (let index = 0; index < 12; index++) {
    const element = gamesInfo[index];
    streams.push(element);
  }
  showChannels(context, platform, streams);
}
