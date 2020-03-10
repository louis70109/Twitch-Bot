import { StreamNotifyModel } from '../../model/notify';
import sendMessage from '../../templates/common/sendMessage';

export default async function notifyCancelBinding(
  context: any,
  { match }
): Promise<void> {
  const name: string = match.groups?.name;
  const userId: string = context._session?.user?.id;
  const $notify: any = new StreamNotifyModel();
  $notify.name = name;
  $notify.userId = userId;
  const $stream = await StreamNotifyModel.remove({
    userId: userId,
    name: name,
  });
  if (!$stream) {
    sendMessage(context, '❌ 您未綁定此直播喔！');
  } else sendMessage(context, '✅ 解除成功');
}
