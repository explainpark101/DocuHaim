import { refreshTelegramDialogs } from '@/utils/telegram/dialogs';
import { getTelegramClient } from '@/utils/telegram/telegramRuntime';

export type TelegramCreateKind = 'group' | 'channel';

export async function createTelegramChat(
  kind: TelegramCreateKind,
  title: string,
  about = '',
): Promise<void> {
  const client = getTelegramClient();
  if (!client) throw new Error('Telegram에 연결되지 않았습니다.');
  const name = title.trim();
  if (!name) throw new Error('제목을 입력하세요.');
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
