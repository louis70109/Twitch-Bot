import { UserModel } from '../../model/user';
import TwitchClient from 'twitch';

export default async function userBinding(context, { match }) {
  const userName = match.groups?.name;
  const lineId = context._session?.user?.id;

  const twitchClient = await TwitchClient.withCredentials(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
  );

  const twitchUser = await twitchClient.helix.users.getUserByName(userName);

  if (!twitchUser) throw Error('User not found');
  const userObj = {
    name: twitchUser.name,
    displayName: twitchUser.displayName,
    twitchId: twitchUser.id,
    lineId: lineId,
  };
  const user = new UserModel(userObj);
  const isAlive = await UserModel.findOne({ lineId: lineId });
  if (!isAlive) {
    console.log('this record not found');
    await user.save(err => {
      if (err) throw err;
      // await db.close();
    });
  } else {
    console.log('Find record, update...');
    await UserModel.updateOne({ lineId: lineId }, userObj);
  }
  await context.sendText('綁定完成');
}
