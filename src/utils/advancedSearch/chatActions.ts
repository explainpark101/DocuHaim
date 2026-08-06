/**
 * Bridge: ChatWithMyself composer registers focus actions for Advanced Search.
 */

export type ChatActionId = 'chat-focus-composer';

export type ChatActionHandler = () => void | Promise<void>;

type Listener = () => void;

const handlers = new Map<ChatActionId, ChatActionHandler>();
const listeners = new Set<Listener>();

function notify(): void {
  for (const l of listeners) {
    try {
      l();
    } catch {
      // ignore
    }
  }
}

/** Register chat-page actions while the chat composer is mounted. */
export function registerChatActions(
  next: Partial<Record<ChatActionId, ChatActionHandler>>,
): () => void {
  const keys = Object.keys(next) as ChatActionId[];
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

export function hasChatActions(): boolean {
  return handlers.size > 0;
}

export function isChatActionId(id: string | undefined | null): id is ChatActionId {
  return Boolean(id && handlers.has(id as ChatActionId));
}

export function runChatAction(id: string): boolean {
  const fn = handlers.get(id as ChatActionId);
  if (!fn) return false;
  try {
    void fn();
    return true;
  } catch (err) {
    console.warn('[advancedSearch] chat action failed', id, err);
    return false;
  }
}

export function subscribeChatActions(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export type ChatActionCommandDef = {
  id: ChatActionId;
  title: string;
  description: string;
  keywords: string[];
};

/** Shown in Advanced Search only while chat composer has registered actions. */
export const CHAT_ACTION_COMMANDS: readonly ChatActionCommandDef[] = [
  {
    id: 'chat-focus-composer',
    title: '입력창에 포커스',
    description: '메시지 입력창으로 커서를 옮깁니다',
    keywords: [
      '입력창',
      '포커스',
      'focus',
      'composer',
      '메시지 입력',
      '커서',
      '채팅 입력',
      'input focus',
      'focus composer',
      'focus input',
    ],
  },
];
