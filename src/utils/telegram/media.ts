import { installBrowserBuffer } from '@/utils/telegram/installBrowserBuffer';
import { getTelegramSnapshot, patchTelegram } from '@/utils/telegram/telegramState';
import { getTelegramClient, recallTelegramEntity } from '@/utils/telegram/telegramRuntime';
import { mapTelegramMessage, rawTelegramMessage } from '@/utils/telegram/messages';

export type TelegramMediaBytes = {
  bytes: Uint8Array;
  name: string;
  mime: string;
};

function requireClient() {
  const client = getTelegramClient();
  if (!client) throw new Error('Telegram is not connected');
  return client;
}

function entityFor(dialogId: string): unknown {
  const entity = recallTelegramEntity(dialogId);
  if (!entity) throw new Error('Chat not found');
  return entity;
}

function toUint8Array(raw: unknown): Uint8Array {
  let view: Uint8Array;
  if (raw instanceof Uint8Array) view = raw;
  else if (typeof raw === 'string') view = new TextEncoder().encode(raw);
  else throw new Error('Could not download Telegram media');
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
  const sent = await client.sendFile(entityFor(dialogId) as never, {
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
    const fetched = await client.getMessages(entityFor(dialogId) as never, { ids: messageId });
    raw = Array.isArray(fetched) ? fetched[0] : fetched;
  }
  if (!raw) throw new Error('Message not found');
  const downloaded = await client.downloadMedia(raw as never, {});
  const rec = raw as { file?: { name?: string; mimeType?: string } };
  const name = rec.file?.name || `telegram-${messageId}`;
  const mime = rec.file?.mimeType || 'application/octet-stream';
  return { bytes: toUint8Array(downloaded), name, mime };
}
