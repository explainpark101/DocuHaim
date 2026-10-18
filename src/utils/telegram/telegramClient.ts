import { isTelegramShell } from '@/utils/telegram/telegramPlatform';
import { clearTelegramSession, loadTelegramSession, saveTelegramSession } from '@/utils/telegram/sessionStore';
import {
  cancelLoginInput,
  getTelegramSnapshot,
  patchTelegram,
  resetTelegramSnapshot,
  waitForLoginInput,
} from '@/utils/telegram/telegramState';
import {
  clearTelegramCaches,
  getTelegramClient,
  setTelegramClient,
} from '@/utils/telegram/telegramRuntime';
import { refreshTelegramDialogs } from '@/utils/telegram/dialogs';
import { applyIncomingMessage, notifyTelegramIncoming } from '@/utils/telegram/events';
import { mapTelegramMessage, telegramPeerId } from '@/utils/telegram/messages';
import type { TelegramStoredSession } from '@/utils/telegram/types';

let connecting: Promise<void> | null = null;
let resumeBound = false;
let updateHandler: ((event: { message?: unknown }) => void) | null = null;

function describeAuthError(err: unknown): string {
  const rec = err as { errorMessage?: string; message?: string };
  const code = rec.errorMessage || '';
  if (code === 'PHONE_CODE_INVALID') return '인증 코드가 올바르지 않습니다.';
  if (code === 'PHONE_CODE_EXPIRED') return '인증 코드가 만료되었습니다. 전화번호를 다시 입력하세요.';
  if (code === 'PHONE_NUMBER_INVALID') return '전화번호는 국가 코드를 포함해 입력하세요. 예: +821012345678';
  if (code === 'PHONE_NUMBER_BANNED' || code === 'PHONE_NUMBER_FLOOD') {
    return '이 번호로는 지금 로그인할 수 없습니다.';
  }
  if (code === 'PASSWORD_HASH_INVALID') return '2단계 비밀번호가 올바르지 않습니다.';
  if (code.startsWith('FLOOD_WAIT')) return '요청이 많습니다. 잠시 후 다시 시도하세요.';
  if (rec.message === 'Code is empty' || rec.message === 'Password is empty') return '값을 입력하세요.';
  if (rec.message === 'First name is required') return '이름을 입력하세요.';
  return '';
}

function safeError(err: unknown): string {
  const raw = err instanceof Error ? err.message : 'Telegram connection failed';
  if (!raw || raw.length > 180) return 'Telegram connection failed';
  return raw;
}

function bindResume(): void {
  if (resumeBound || typeof document === 'undefined') return;
  resumeBound = true;
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState !== 'visible') return;
    void reconnectTelegramIfNeeded();
  });
}

async function loadGram() {
  const { Buffer } = await import('buffer');
  const g = globalThis as typeof globalThis & { Buffer?: typeof Buffer };
  if (!g.Buffer) g.Buffer = Buffer;
  const [telegram, sessions, extensions, loggerMod, events] = await Promise.all([
    import('telegram'),
    import('telegram/sessions'),
    import('telegram/extensions'),
    import('telegram/extensions/Logger'),
    import('telegram/events'),
  ]);
  return {
    TelegramClient: telegram.TelegramClient,
    Api: telegram.Api,
    StringSession: sessions.StringSession,
    PromisedWebSockets: extensions.PromisedWebSockets,
    Logger: loggerMod.Logger,
    LogLevel: loggerMod.LogLevel,
    NewMessage: events.NewMessage,
  };
}

async function startClient(stored: TelegramStoredSession): Promise<void> {
  const gram = await loadGram();
  const client = new gram.TelegramClient(
    new gram.StringSession(stored.session || ''),
    stored.apiId,
    stored.apiHash,
    {
      connectionRetries: 5,
      useWSS: true,
      networkSocket: gram.PromisedWebSockets,
      autoReconnect: true,
      deviceModel: 'DocuHaim',
      systemVersion: 'Tauri',
      appVersion: '2.4.0',
      baseLogger: new gram.Logger(gram.LogLevel.NONE),
    },
  );
  setTelegramClient(client);
  await client.start({
    phoneNumber: async () =>
      waitForLoginInput('phone', '국가 코드를 포함한 전화번호를 입력하세요. 인증은 이 화면에서 끝납니다.'),
    phoneCode: async (isCodeViaApp) => {
      patchTelegram({ codeViaApp: Boolean(isCodeViaApp) });
      return waitForLoginInput(
        'code',
        isCodeViaApp
          ? '코드가 다른 Telegram 앱으로 전달되었습니다. 그 코드를 여기에 입력하거나 문자로 다시 받으세요.'
          : '인증 코드가 이 번호의 문자 또는 전화로 전달됩니다. 받은 코드를 여기에 입력하세요.',
      );
    },
    password: async (hint) =>
      waitForLoginInput(
        'password',
        hint ? `2단계 비밀번호를 입력하세요. 힌트: ${hint}` : '2단계 비밀번호를 입력하세요.',
      ),
    firstAndLastNames: async () => {
      const raw = await waitForLoginInput('name', '새 계정입니다. 이름을 입력하면 이 앱에서 가입이 끝납니다.');
      const [first = '', last = ''] = raw.split('\n');
      return [first.trim(), last.trim()];
    },
    // Prefer SMS so the code can be typed here without opening another Telegram client.
    forceSMS: true,
    onError: async (err) => {
      const text = describeAuthError(err);
      if (text) patchTelegram({ error: text });
      return false;
    },
  });
  const saved = String(client.session.save());
  await saveTelegramSession({
    apiId: stored.apiId,
    apiHash: stored.apiHash,
    session: saved,
  });
  let selfName = '';
  try {
    const me = await client.getMe();
    const user = me as { firstName?: string; username?: string };
    selfName = user.firstName || user.username || '';
  } catch {
    selfName = '';
  }
  if (updateHandler) {
    client.removeEventHandler(updateHandler, new gram.NewMessage({}));
  }
  updateHandler = (event) => {
    const raw = event.message as {
      out?: boolean;
      message?: string;
      text?: string;
      chatId?: unknown;
      peerId?: unknown;
    };
    if (!raw) return;
    const dialogId = telegramPeerId(raw.chatId) || telegramPeerId(raw.peerId);
    if (!dialogId) return;
    const mapped = mapTelegramMessage(dialogId, raw);
    if (!mapped) return;
    const snap = getTelegramSnapshot();
    applyIncomingMessage(snap.dialogs, snap.activeDialogId, snap.messages, mapped);
    if (mapped.out) return;
    const dialog = snap.dialogs.find((item) => item.id === dialogId);
    const title = dialog?.title || 'Telegram';
    void notifyTelegramIncoming(title, mapped.text || mapped.mediaName || '새 메시지');
  };
  client.addEventHandler(updateHandler, new gram.NewMessage({}));
  patchTelegram({ status: 'ready', error: null, selfName });
  await refreshTelegramDialogs();
}

/** Reconnect a saved session without prompting for login. */
export async function connectTelegramInBackground(): Promise<void> {
  if (!isTelegramShell()) return;
  const stored = await loadTelegramSession();
  if (!stored?.session) return;
  await connectTelegram();
}

export async function connectTelegram(): Promise<void> {
  if (!isTelegramShell()) {
    patchTelegram({ status: 'error', error: '데스크톱 또는 Android 앱에서만 사용할 수 있습니다.' });
    return;
  }
  if (getTelegramClient() && getTelegramSnapshot().status === 'ready') return;
  if (connecting) return connecting;
  connecting = (async () => {
    bindResume();
    patchTelegram({ status: 'connecting', error: null });
    const stored = await loadTelegramSession();
    if (!stored) {
      patchTelegram({ status: 'need-credentials', error: null });
      return;
    }
    try {
      await startClient(stored);
    } catch (err) {
      if (safeError(err) === 'Telegram login cancelled') {
        patchTelegram({ status: 'need-credentials', error: null });
        return;
      }
      setTelegramClient(null);
      patchTelegram({ status: 'error', error: safeError(err) });
    }
  })().finally(() => {
    connecting = null;
  });
  return connecting;
}

export async function connectTelegramWithCredentials(apiId: number, apiHash: string): Promise<void> {
  const hash = apiHash.trim();
  if (!Number.isFinite(apiId) || apiId <= 0 || !hash) {
    throw new Error('api_id와 api_hash를 입력하세요.');
  }
  const previous = await loadTelegramSession();
  await saveTelegramSession({
    apiId,
    apiHash: hash,
    session: previous && previous.apiId === apiId ? previous.session : '',
  });
  await disconnectTelegram({ keepSnapshot: true });
  await connectTelegram();
}

export async function reconnectTelegramIfNeeded(): Promise<void> {
  if (!isTelegramShell()) return;
  const client = getTelegramClient();
  if (!client) {
    const stored = await loadTelegramSession();
    if (stored?.session) await connectTelegram();
    return;
  }
  try {
    await client.connect();
  } catch {
    // Activity resume can race a socket that is already up.
  }
}

export async function disconnectTelegram(opts?: { keepSnapshot?: boolean }): Promise<void> {
  cancelLoginInput();
  const client = getTelegramClient();
  setTelegramClient(null);
  if (client && updateHandler) {
    try {
      client.removeEventHandler(updateHandler, undefined as never);
    } catch {
      // ignore
    }
  }
  updateHandler = null;
  if (client) {
    try {
      await client.disconnect();
    } catch {
      // ignore
    }
  }
  clearTelegramCaches();
  if (!opts?.keepSnapshot) resetTelegramSnapshot();
}

export async function logoutTelegram(): Promise<void> {
  const client = getTelegramClient();
  if (client) {
    try {
      const { Api } = await import('telegram');
      await client.invoke(new Api.auth.LogOut());
    } catch {
      // Local session is cleared even if the server logout fails.
    }
  }
  await clearTelegramSession();
  await disconnectTelegram();
}
