import sendMessage from './sendMessage';

export default async function helpMe(context): Promise<void> {
  const message =
    '🎮 輸入範例\n1.綁帳號: 綁定 sam1268\n2.查詢追隨: follow\n3.找遊戲: top\n4.輸入: 連結 LINE Notify\n5. 關於我: author';
  await sendMessage(context, message);
}
