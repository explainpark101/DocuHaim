import { patchTelegram } from '@/utils/telegram/telegramState';
import { getTelegramClient, rememberTelegramEntity } from '@/utils/telegram/telegramRuntime';
import { telegramPeerId } from '@/utils/telegram/messages';
import type { TelegramDialogItem } from '@/utils/telegram/types';

type DialogLike = {
  id?: unknown;
  title?: string;
  name?: string;
  unreadCount?: number;
  message?: { message?: string; text?: string };
  isChannel?: boolean;
  isGroup?: boolean;
  entity?: unknown;
};

export async function refreshTelegramDialogs(): Promise<TelegramDialogItem[]> {
  const client = getTelegramClient();
  if (!client) return [];
  const dialogs = (await client.getDialogs({ limit: 100 })) as DialogLike[];
  const items: TelegramDialogItem[] = [];
  for (const dialog of dialogs) {
    const id = telegramPeerId(dialog.id);
    if (!id) continue;
    if (dialog.entity) rememberTelegramEntity(id, dialog.entity);
    const preview = String(dialog.message?.message || dialog.message?.text || '');
    items.push({
      id,
      title: String(dialog.title || dialog.name || id),
      unread: Number(dialog.unreadCount) || 0,
      preview,
      isChannel: Boolean(dialog.isChannel && !dialog.isGroup),
      isGroup: Boolean(dialog.isGroup),
    });
  }
  patchTelegram({ dialogs: items });
  return items;
}
