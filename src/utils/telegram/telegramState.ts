import type {
  TelegramLoginField,
  TelegramSnapshot,
} from '@/utils/telegram/types';

const EMPTY: TelegramSnapshot = {
  status: 'idle',
  error: null,
  selfName: '',
  dialogs: [],
  activeDialogId: null,
  messages: [],
  messagesLoading: false,
  hasMoreHistory: false,
  replyTo: null,
  notice: null,
  loginHint: null,
  codeViaApp: false,
};

let snapshot: TelegramSnapshot = EMPTY;
const listeners = new Set<() => void>();

type Waiter = {
  kind: TelegramLoginField;
  resolve: (value: string) => void;
  reject: (err: Error) => void;
};

let waiter: Waiter | null = null;

function emit() {
  for (const listener of listeners) {
    try {
      listener();
    } catch {
      // ignore subscriber errors
    }
  }
}

export function getTelegramSnapshot(): TelegramSnapshot {
  return snapshot;
}

export function subscribeTelegram(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function patchTelegram(partial: Partial<TelegramSnapshot>): void {
  snapshot = { ...snapshot, ...partial };
  emit();
}

export function resetTelegramSnapshot(): void {
  if (waiter) {
    waiter.reject(new Error('Telegram login cancelled'));
    waiter = null;
  }
  snapshot = EMPTY;
  emit();
}

function statusForLoginField(kind: TelegramLoginField): TelegramSnapshot['status'] {
  if (kind === 'phone') return 'need-phone';
  if (kind === 'code') return 'need-code';
  if (kind === 'name') return 'need-name';
  return 'need-password';
}

export function waitForLoginInput(kind: TelegramLoginField, hint?: string): Promise<string> {
  if (waiter) {
    waiter.reject(new Error('Telegram login superseded'));
    waiter = null;
  }
  patchTelegram({
    status: statusForLoginField(kind),
    loginHint: hint ?? null,
    ...(kind === 'phone' ? { codeViaApp: false } : {}),
  });
  return new Promise((resolve, reject) => {
    waiter = { kind, resolve, reject };
  });
}

/** Ask GramJS to send the login code again, preferring SMS. */
export function restartLoginForSms(): void {
  const current = waiter;
  if (!current || current.kind !== 'code') return;
  waiter = null;
  const err = new Error('RESTART_AUTH') as Error & { errorMessage: string };
  err.errorMessage = 'RESTART_AUTH';
  patchTelegram({
    status: 'connecting',
    error: null,
    codeViaApp: false,
    loginHint: '문자로 인증 코드를 다시 요청합니다.',
  });
  current.reject(err);
}

export function submitLoginInput(value: string): void {
  const current = waiter;
  if (!current) return;
  waiter = null;
  patchTelegram({ status: 'connecting', error: null });
  current.resolve(value.trim());
}

export function cancelLoginInput(): void {
  const current = waiter;
  waiter = null;
  if (current) current.reject(new Error('Telegram login cancelled'));
}
