import { StreamNotifyModel } from '../../model/notify';
import sendMessage from '../../templates/common/sendMessage';

export default async function notifyBinding(
  context: any,
  { match }
): Promise<void> {
  const name = match.groups?.name;
  const userId = context._session?.user?.id;
  const notify = new StreamNotifyModel();
  notify.name = name;
  notify.userId = userId;
  await StreamNotifyModel.findOne({ userId: userId }, (err, isAlive) => {
    if (!isAlive) {
      notify.save(err => {
        if (err) {
          sendMessage(context, '❌ 綁定失敗');
          return;
        }
      });
    } else {
      const notifyObj = {
        name: name,
        userId: userId,
      };
      StreamNotifyModel.findOneAndUpdate(
        { userId: userId },
        notifyObj,
        (err, res) => {
          if (!err) console.log('帳戶更新成功', res);
        }
      );
    }
    sendMessage(context, `✅ 綁定編號: ${name} 成功！`);
  });
}
