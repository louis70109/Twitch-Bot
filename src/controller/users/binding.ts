import { UserModel } from '../../model/user';
import TwitchClient from 'twitch';
import { LineContext } from 'bottender';

const { TWITCH_CLIENT_ID, TWITCH_ACCESS_TOKEN } = process.env;

export default async function userBinding(
  context: LineContext,
  { match }
): Promise<void> {
  const userName: string = match.groups?.name;
  const userId: string = context._session?.user?.id;

  const twitchClient = await TwitchClient.withCredentials(
    TWITCH_CLIENT_ID,
    TWITCH_ACCESS_TOKEN
  );

  const twitchUser = await twitchClient.helix.users.getUserByName(userName);
  if (!twitchUser) {
    context.sendText('👾 綁定帳號失敗，請檢查 Twitch 是否有效');
    return;
  }

  const user: any = new UserModel();
  user.name = twitchUser.name;
  user.displayName = twitchUser.displayName;
  user.twitchId = twitchUser.id;
  user.userId = userId;
  await UserModel.findOne({ userId: userId }, (_, isAlive) => {
    if (!isAlive) {
      user.save(err => {
        if (err) {
          context.sendText('❌ 綁定失敗');
          throw Error(`帳號綁定失敗: ${err}`);
        }
      });
    } else {
      const userObj = {
        name: twitchUser.name,
        displayName: twitchUser.displayName,
        twitchId: twitchUser.id,
        userId: userId,
      };
      UserModel.findOneAndUpdate({ userId: userId }, userObj, err => {
        if (err) console.log('帳戶更新失敗', err);
      });
    }
    context.sendText(`✅ 綁定 ${twitchUser.name} 成功！`);
  });
}
