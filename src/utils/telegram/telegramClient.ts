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
import {
  confirmTelegramPortalCode,
  requestTelegramPortalCode,
} from '@/utils/telegram/portalLogin';

let connecting: Promise<void> | null = null;
let presetPhone = '';
let resumeBound = false;
let updateHandler: ((event: { message?: unknown }) => void) | null = null;

function errorText(err: unknown, fallback: string): string {
  if (typeof err === 'string' && err.trim()) return err.trim();
  if (err instanceof Error && err.message.trim()) return err.message.trim();
  return fallback;
}

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
    phoneNumber: async () => {
      if (presetPhone) return presetPhone;
      return waitForLoginInput(
        'phone',
        '국가 코드를 포함한 전화번호를 입력하세요. 확인이 끝나면 이 기기에 저장됩니다.',
      );
    },
    phoneCode: async (isCodeViaApp) => {
      patchTelegram({ codeViaApp: Boolean(isCodeViaApp) });
      return waitForLoginInput(
        'code',
        isCodeViaApp
          ? '이 기기에 로그인할 코드가 다른 Telegram 앱으로 전달되었습니다. 그 코드를 입력하거나 문자로 다시 받으세요.'
          : '이 기기에 로그인할 코드가 문자 또는 전화로 전달됩니다. 입력하면 세션이 이 기기에 저장됩니다.',
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
  presetPhone = '';
  patchTelegram({ status: 'ready', error: null, loginStep: null, selfName });
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
      patchTelegram({
        status: 'need-phone',
        loginStep: 'portal-phone',
        error: null,
        loginHint: '휴대폰 번호를 입력하세요. Telegram 서버가 확인하면 이 기기에 자동으로 저장됩니다.',
      });
      return;
    }
    try {
      await startClient(stored);
    } catch (err) {
      if (safeError(err) === 'Telegram login cancelled') {
        patchTelegram({
          status: 'need-phone',
          loginStep: 'portal-phone',
          error: null,
          loginHint: '휴대폰 번호를 입력하세요. Telegram 서버가 확인하면 이 기기에 자동으로 저장됩니다.',
        });
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

export async function beginTelegramPhoneLogin(phone: string): Promise<void> {
  patchTelegram({ status: 'connecting', error: null, loginHint: null });
  try {
    await requestTelegramPortalCode(phone);
    patchTelegram({
      status: 'need-code',
      loginStep: 'portal-code',
      codeViaApp: false,
      error: null,
      loginHint:
        'Telegram이 보낸 확인 코드를 입력하세요. 번호가 확인되면 연결 정보가 이 기기에 저장되고, 이어서 로그인 코드를 받습니다.',
    });
  } catch (err) {
    patchTelegram({
      status: 'need-phone',
      loginStep: 'portal-phone',
      error: errorText(err, '확인 코드를 요청하지 못했습니다.'),
    });
  }
}

export async function completeTelegramPortalLogin(code: string): Promise<void> {
  patchTelegram({ status: 'connecting', error: null, loginHint: '번호를 확인하고 이 기기에 저장하는 중입니다.' });
  try {
    const creds = await confirmTelegramPortalCode(code);
    await saveTelegramSession({
      apiId: creds.apiId,
      apiHash: creds.apiHash,
      session: '',
    });
    presetPhone = creds.phone;
    await disconnectTelegram({ keepSnapshot: true });
    await connectTelegram();
  } catch (err) {
    patchTelegram({
      status: 'need-code',
      loginStep: 'portal-code',
      error: errorText(err, '번호를 확인하지 못했습니다.'),
    });
  }
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
  if (!opts?.keepSnapshot) {
    presetPhone = '';
    resetTelegramSnapshot();
  }
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
