import type { TelegramClient } from 'telegram';

let client: TelegramClient | null = null;
const entities = new Map<string, unknown>();
const messages = new Map<string, unknown>();

export function getTelegramClient(): TelegramClient | null {
  return client;
}

export function setTelegramClient(next: TelegramClient | null): void {
  client = next;
}

export function rememberTelegramEntity(id: string, entity: unknown): void {
  if (!id || entity == null) return;
  entities.set(id, entity);
}

export function recallTelegramEntity(id: string): unknown {
  return entities.get(id);
}

export function cacheTelegramMessage(dialogId: string, id: number, message: unknown): void {
  messages.set(`${dialogId}:${id}`, message);
}

export function cachedTelegramMessage(dialogId: string, id: number): unknown {
  return messages.get(`${dialogId}:${id}`);
}

export function clearTelegramCaches(): void {
  entities.clear();
  messages.clear();
}
