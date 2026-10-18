/**
 * Bridge: Telegram composer registers focus for Advanced Search.
 */

export type TelegramActionId = 'telegram-focus-composer';

export type TelegramActionHandler = () => void | Promise<void>;

type Listener = () => void;

const handlers = new Map<TelegramActionId, TelegramActionHandler>();
const listeners = new Set<Listener>();

function notify(): void {
  for (const listener of listeners) {
    try {
      listener();
    } catch {
      // ignore
    }
  }
}

export function registerTelegramActions(
  next: Partial<Record<TelegramActionId, TelegramActionHandler>>,
): () => void {
  const keys = Object.keys(next) as TelegramActionId[];
  for (const key of keys) {
    const fn = next[key];
    if (typeof fn === 'function') handlers.set(key, fn);
  }
  notify();
  return () => {
    for (const key of keys) handlers.delete(key);
    notify();
  };
}

export function hasTelegramActions(): boolean {
  return handlers.size > 0;
}

export function isTelegramActionId(id: string | undefined | null): id is TelegramActionId {
  return Boolean(id && handlers.has(id as TelegramActionId));
}

export function runTelegramAction(id: string): boolean {
  const fn = handlers.get(id as TelegramActionId);
  if (!fn) return false;
  try {
    void fn();
    return true;
  } catch (err) {
    console.warn('[advancedSearch] telegram action failed', id, err);
    return false;
  }
}

export function subscribeTelegramActions(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export type TelegramActionCommandDef = {
  id: TelegramActionId;
  title: string;
  description: string;
  keywords: string[];
};

export const TELEGRAM_ACTION_COMMANDS: readonly TelegramActionCommandDef[] = [
  {
    id: 'telegram-focus-composer',
    title: 'Telegram 입력창에 포커스',
    description: 'Telegram 메시지 입력창으로 커서를 옮깁니다',
    keywords: ['telegram', '텔레그램', 'focus', '포커스', '입력'],
  },
];
