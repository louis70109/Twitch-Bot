import { LineContext } from 'bottender';

export default async function author(context: LineContext): Promise<void> {
  const message =
    '🦈【NiJia Lin】🦈\n✏️ 部落格:\nhttps://nijialin.com/\n\n🐙 Github:\nhttps://github.com/louis70109';
  await context.sendText(message);
}
