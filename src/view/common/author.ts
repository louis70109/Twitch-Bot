import sendMessage from './sendMessage';
export default async function author(context): Promise<void> {
  const message =
    '🦈【NiJia Lin】🦈\n✏️ 部落格:\nhttps://nijialin.com/\n\n🐙 Github:\nhttps://github.com/louis70109';
  await sendMessage(context, message);
}
