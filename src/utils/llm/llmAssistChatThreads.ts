import type { LlmChatMessage } from '@/utils/llm/llmChatStream';

const THREADS_KEY = 's3haim-llm-assist-chat-threads';
const ACTIVE_THREAD_KEY = 's3haim-llm-assist-chat-active-thread';
const MAX_THREADS = 40;

export type LlmAssistChatThread = {
  id: string;
  title: string;
  messages: LlmChatMessage[];
  createdAt: number;
  updatedAt: number;
};

export type LlmAssistChatReference = {
  id: string;
  text: string;
};

function safeParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

export function createLlmAssistChatThreadId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `thread-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function createLlmAssistReferenceId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `ref-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function normalizeThread(value: unknown): LlmAssistChatThread | null {
  if (!value || typeof value !== 'object') return null;
  const rec = value as Record<string, unknown>;
  if (typeof rec.id !== 'string' || !rec.id) return null;
  const messages = Array.isArray(rec.messages) ? (rec.messages as LlmChatMessage[]) : [];
  const createdAt = typeof rec.createdAt === 'number' ? rec.createdAt : Date.now();
  const updatedAt = typeof rec.updatedAt === 'number' ? rec.updatedAt : createdAt;
  const title =
    typeof rec.title === 'string' && rec.title.trim()
      ? rec.title.trim()
      : deriveThreadTitle(messages);
  return { id: rec.id, title, messages, createdAt, updatedAt };
}

export function deriveThreadTitle(messages: LlmChatMessage[]): string {
  const firstUser = messages.find((m) => m.role === 'user' && m.content.trim());
  if (!firstUser) return '새 대화';
  const text = firstUser.content.trim().replace(/\s+/g, ' ');
  return text.length > 40 ? `${text.slice(0, 40)}…` : text;
}

export function loadLlmAssistChatThreads(): LlmAssistChatThread[] {
  try {
    const parsed = safeParse<unknown>(localStorage.getItem(THREADS_KEY));
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(normalizeThread)
      .filter((t): t is LlmAssistChatThread => t !== null)
      .sort((a, b) => b.updatedAt - a.updatedAt);
  } catch {
    return [];
  }
}

export function saveLlmAssistChatThreads(threads: LlmAssistChatThread[]): void {
  try {
    const trimmed = [...threads]
      .sort((a, b) => b.updatedAt - a.updatedAt)
      .slice(0, MAX_THREADS);
    localStorage.setItem(THREADS_KEY, JSON.stringify(trimmed));
  } catch {
    // ignore
  }
}

export function loadActiveLlmAssistChatThreadId(): string | null {
  try {
    const id = localStorage.getItem(ACTIVE_THREAD_KEY);
    return id && id.trim() ? id.trim() : null;
  } catch {
    return null;
  }
}

export function saveActiveLlmAssistChatThreadId(id: string | null): void {
  try {
    if (!id) localStorage.removeItem(ACTIVE_THREAD_KEY);
    else localStorage.setItem(ACTIVE_THREAD_KEY, id);
  } catch {
    // ignore
  }
}

export function upsertLlmAssistChatThread(
  threads: LlmAssistChatThread[],
  thread: LlmAssistChatThread,
): LlmAssistChatThread[] {
  const next = threads.filter((t) => t.id !== thread.id);
  next.unshift(thread);
  return next.slice(0, MAX_THREADS);
}

export function deleteLlmAssistChatThread(
  threads: LlmAssistChatThread[],
  threadId: string,
): LlmAssistChatThread[] {
  return threads.filter((t) => t.id !== threadId);
}
