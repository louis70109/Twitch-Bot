export default async function helpMe(context): Promise<void> {
  await context.sendText(
    '🎮 輸入範例\n綁帳號: 綁定 sam1268\n查詢追隨: follow\n找遊戲: top'
  );
}
