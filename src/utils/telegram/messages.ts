import { getTelegramSnapshot, patchTelegram } from '@/utils/telegram/telegramState';
import {
  cacheTelegramMessage,
  cachedTelegramMessage,
  getTelegramClient,
  recallTelegramEntity,
} from '@/utils/telegram/telegramRuntime';
import { formatTelegramError } from '@/utils/telegram/telegramError';
import type { TelegramMessageItem } from '@/utils/telegram/types';

const PAGE_SIZE = 40;

export function telegramPeerId(value: unknown): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'bigint') return String(value);
  if (typeof value === 'object') {
    const rec = value as Record<string, unknown>;
    if (rec.userId != null) return String(rec.userId);
    if (rec.channelId != null) return String(rec.channelId);
    if (rec.chatId != null) return String(rec.chatId);
  }
  const text = String(value);
  return text === '[object Object]' ? '' : text;
}

type RawMessage = {
  id?: number;
  message?: string;
  text?: string;
  date?: number;
  out?: boolean;
  media?: unknown;
  replyTo?: { replyToMsgId?: number } | null;
  sender?: { firstName?: string; lastName?: string; title?: string; username?: string };
  senderId?: unknown;
  chatId?: unknown;
  peerId?: unknown;
  file?: { name?: string };
};

export function mapTelegramMessage(dialogId: string, raw: RawMessage): TelegramMessageItem | null {
  const id = Number(raw.id);
  if (!Number.isFinite(id)) return null;
  const sender = raw.sender;
  const senderLabel = [sender?.firstName, sender?.lastName].filter(Boolean).join(' ')
    || sender?.title
    || sender?.username
    || (raw.out ? '나' : '');
  const text = String(raw.message || raw.text || '');
  const mediaName = String(raw.file?.name || '');
  const item: TelegramMessageItem = {
    id,
    dialogId,
    text,
    date: Number(raw.date) || 0,
    out: Boolean(raw.out),
    senderLabel,
    replyToId: raw.replyTo?.replyToMsgId ? Number(raw.replyTo.replyToMsgId) : null,
    hasMedia: Boolean(raw.media),
    mediaName,
  };
  cacheTelegramMessage(dialogId, id, raw);
  return item;
}

function requireClient() {
  const client = getTelegramClient();
  if (!client) throw new Error('Telegram에 연결되지 않았습니다.');
  return client;
}

/** Cached dialog entity, or the id so GramJS can resolve it from the session. */
export function telegramDialogTarget(dialogId: string): unknown {
  return recallTelegramEntity(dialogId) ?? dialogId;
}

export async function loadTelegramHistory(dialogId: string, older = false): Promise<void> {
  const snap = getTelegramSnapshot();
  const oldest = older ? snap.messages[0]?.id : undefined;
  patchTelegram({
    activeDialogId: dialogId,
    messagesLoading: true,
    error: null,
    ...(older ? {} : { messages: [], hasMoreHistory: false, replyTo: null }),
  });
  try {
    const client = requireClient();
    const batch = await client.getMessages(telegramDialogTarget(dialogId) as never, {
      limit: PAGE_SIZE,
      ...(oldest ? { offsetId: oldest } : {}),
    });
    const list = Array.isArray(batch) ? (batch as RawMessage[]) : [];
    const mapped = list
      .map((raw) => mapTelegramMessage(dialogId, raw))
      .filter((item): item is TelegramMessageItem => item != null)
      .sort((a, b) => a.id - b.id);
    const prev = older ? getTelegramSnapshot().messages : [];
    const merged = [...mapped.filter((m) => !prev.some((p) => p.id === m.id)), ...prev].sort(
      (a, b) => a.id - b.id,
    );
    patchTelegram({
      messages: merged,
      messagesLoading: false,
      hasMoreHistory: mapped.length >= PAGE_SIZE,
      dialogs: getTelegramSnapshot().dialogs.map((dialog) =>
        dialog.id === dialogId ? { ...dialog, unread: 0 } : dialog,
      ),
    });
  } catch (err) {
    patchTelegram({ messagesLoading: false });
    try {
      const { dropDeadTelegramSession } = await import('@/utils/telegram/telegramClient');
      if (await dropDeadTelegramSession(err)) return;
    } catch {
      // Show the original failure if session cleanup itself throws.
    }
    patchTelegram({
      error: formatTelegramError(err, '메시지 기록을 불러오지 못했습니다.'),
    });
  }
}

export async function sendTelegramText(dialogId: string, text: string, replyToId?: number): Promise<void> {
  const client = requireClient();
  const body = text.trim();
  if (!body) return;
  const sent = await client.sendMessage(telegramDialogTarget(dialogId) as never, {
    message: body,
    ...(replyToId ? { replyTo: replyToId } : {}),
  });
  const mapped = mapTelegramMessage(dialogId, sent as RawMessage);
  if (!mapped) return;
  const snap = getTelegramSnapshot();
  patchTelegram({
    messages: [...snap.messages, mapped],
    replyTo: null,
    dialogs: snap.dialogs.map((dialog) =>
      dialog.id === dialogId ? { ...dialog, preview: mapped.text } : dialog,
    ),
  });
}

export async function forwardTelegramMessage(
  fromDialogId: string,
  messageId: number,
  toDialogId: string,
): Promise<void> {
  const client = requireClient();
  const raw = cachedTelegramMessage(fromDialogId, messageId);
  await client.forwardMessages(telegramDialogTarget(toDialogId) as never, {
    messages: raw ? [raw as never] : [messageId],
    fromPeer: telegramDialogTarget(fromDialogId) as never,
  });
}

export function setTelegramReply(message: TelegramMessageItem | null): void {
  if (!message) {
    patchTelegram({ replyTo: null });
    return;
  }
  const snippet = message.text || message.mediaName || '미디어';
  patchTelegram({
    replyTo: { id: message.id, snippet: snippet.slice(0, 80) },
  });
}

export function rawTelegramMessage(dialogId: string, messageId: number): unknown {
  return cachedTelegramMessage(dialogId, messageId);
}
