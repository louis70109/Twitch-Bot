import sendMessage from './sendMessage';
export default function author(context): void {
  const message =
    '🦈【NiJia Lin】🦈\n✏️ 部落格:\nhttps://nijialin.com/\n\n🐙 Github:\nhttps://github.com/louis70109';
  sendMessage(context, message);
}
