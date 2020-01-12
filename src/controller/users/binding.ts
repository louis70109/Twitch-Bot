import { UserModel } from '../../model/user';
import TwitchClient from 'twitch';
import mongoose from 'mongoose';
import sendMessage from '../../view/common/sendMessage';

export default async function userBinding(
  context: any,
  { match }
): Promise<void> {
  const userName = match.groups?.name;
  const userId = context._session?.user?.id;

  const twitchClient = await TwitchClient.withCredentials(
    process.env.TWITCH_CLIENT_ID,
    process.env.TWITCH_ACCESS_TOKEN
  );

  const twitchUser = await twitchClient.helix.users.getUserByName(userName);
  if (!twitchUser) {
    sendMessage(context, '👾 綁定帳號失敗，請檢查 Twitch 是否有效');
    return;
  }

  const user = new UserModel();
  user.name = twitchUser.name;
  user.displayName = twitchUser.displayName;
  user.twitchId = twitchUser.id;
  user.userId = userId;
  const isAlive = await UserModel.findOne({ userId: userId });
  if (!isAlive) {
    console.log('this record not found');
    await user.save(err => {
      if (err) {
        sendMessage(context, '❌ 綁定失敗');
        return;
      }
    });
  } else {
    console.log('Find record, update...');
    const userObj = {
      name: twitchUser.name,
      displayName: twitchUser.displayName,
      twitchId: twitchUser.id,
      userId: userId,
    };
    await UserModel.findOneAndUpdate(
      { userId: userId },
      userObj,
      (err, res) => {
        if (!err) console.log('帳戶更新成功', res);
        mongoose.connection.close();
      }
    );
  }
  await sendMessage(context, `✅ 綁定 ${twitchUser.name} 成功！`);
}
