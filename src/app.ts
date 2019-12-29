import { userCreate } from './controller/user';
import { UserModel } from './model/user';
import TwitchClient from 'twitch';
import mongoose from 'mongoose';
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
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

export default async function App(context: any) {
  await getFollow('louis70109');
  // const userObj = {
  //   name: 'nijia222',
  //   displayName: 'nijia122222',
  //   twitchId: 'a12342222',
  //   lineId: 'z1234222',
  // };
  // await userCreate(userObj);
  // const a = await UserModel.findOne({ name: 'nijia' });
  db.close();
  await context.sendText('Welcome to Bottender');
}
