import { refreshTelegramDialogs } from '@/utils/telegram/dialogs';
import { getTelegramClient } from '@/utils/telegram/telegramRuntime';

export type TelegramCreateKind = 'group' | 'channel';

export async function createTelegramChat(
  kind: TelegramCreateKind,
  title: string,
  about = '',
): Promise<void> {
  const client = getTelegramClient();
  if (!client) throw new Error('Telegram is not connected');
  const name = title.trim();
  if (!name) throw new Error('Title is required');
  const { Api } = await import('telegram');
  await client.invoke(
    new Api.channels.CreateChannel({
      title: name,
      about: about.trim(),
      megagroup: kind === 'group',
      broadcast: kind === 'channel',
    }),
  );
  await refreshTelegramDialogs();
}
