import { appendShareChatMessage } from '@/utils/chatWithMyself/shareSend.js';
import { downloadTelegramMedia } from '@/utils/telegram/media';
import { rawTelegramMessage } from '@/utils/telegram/messages';
import type { TelegramMessageItem } from '@/utils/telegram/types';

type ChatCtx = Parameters<typeof appendShareChatMessage>[0];

export async function shareTelegramMessageToChat(
  ctx: ChatCtx,
  dialogTitle: string,
  message: TelegramMessageItem,
): Promise<void> {
  const files: File[] = [];
  if (message.hasMedia) {
    const media = await downloadTelegramMedia(message.dialogId, message.id);
    const copy = new ArrayBuffer(media.bytes.byteLength);
    new Uint8Array(copy).set(media.bytes);
    const blob = new Blob([copy], { type: media.mime });
    files.push(new File([blob], media.name, { type: media.mime }));
  }
  const raw = rawTelegramMessage(message.dialogId, message.id) as { message?: string } | undefined;
  const text = String(message.text || raw?.message || '').trim();
  const body = [`Telegram · ${dialogTitle}`, text].filter(Boolean).join('\n\n');
  await appendShareChatMessage(ctx, { body, files });
}
