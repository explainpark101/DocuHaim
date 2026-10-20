import { installBrowserBuffer } from '@/utils/telegram/installBrowserBuffer';
import { getTelegramSnapshot, patchTelegram } from '@/utils/telegram/telegramState';
import { getTelegramClient } from '@/utils/telegram/telegramRuntime';
import { mapTelegramMessage, rawTelegramMessage, telegramDialogTarget } from '@/utils/telegram/messages';

export type TelegramMediaBytes = {
  bytes: Uint8Array;
  name: string;
  mime: string;
};

function requireClient() {
  const client = getTelegramClient();
  if (!client) throw new Error('Telegram에 연결되지 않았습니다.');
  return client;
}

function toUint8Array(raw: unknown): Uint8Array {
  let view: Uint8Array;
  if (raw instanceof Uint8Array) view = raw;
  else if (typeof raw === 'string') view = new TextEncoder().encode(raw);
  else throw new Error('파일을 받지 못했습니다.');
  const copy = new Uint8Array(view.byteLength);
  copy.set(view);
  return copy;
}

export async function sendTelegramFile(
  dialogId: string,
  file: File,
  caption: string,
  replyToId?: number,
): Promise<void> {
  const client = requireClient();
  const bytes = new Uint8Array(await file.arrayBuffer());
  const Buffer = installBrowserBuffer();
  const sent = await client.sendFile(telegramDialogTarget(dialogId) as never, {
    file: Buffer.from(bytes),
    ...(caption.trim() ? { caption: caption.trim() } : {}),
    ...(replyToId ? { replyTo: replyToId } : {}),
    forceDocument: !file.type.startsWith('image/'),
    workers: 1,
  });
  const mapped = mapTelegramMessage(dialogId, sent as never);
  if (!mapped) return;
  const snap = getTelegramSnapshot();
  patchTelegram({
    messages: [...snap.messages, mapped],
    replyTo: null,
    dialogs: snap.dialogs.map((dialog) =>
      dialog.id === dialogId
        ? { ...dialog, preview: mapped.text || mapped.mediaName || file.name }
        : dialog,
    ),
  });
}

export async function downloadTelegramMedia(
  dialogId: string,
  messageId: number,
): Promise<TelegramMediaBytes> {
  const client = requireClient();
  let raw = rawTelegramMessage(dialogId, messageId);
  if (!raw) {
    const fetched = await client.getMessages(telegramDialogTarget(dialogId) as never, { ids: messageId });
    raw = Array.isArray(fetched) ? fetched[0] : fetched;
  }
  if (!raw) throw new Error('메시지를 찾을 수 없습니다.');
  const downloaded = await client.downloadMedia(raw as never, {});
  const rec = raw as { file?: { name?: string; mimeType?: string } };
  const name = rec.file?.name || `telegram-${messageId}`;
  const mime = rec.file?.mimeType || 'application/octet-stream';
  return { bytes: toUint8Array(downloaded), name, mime };
}
