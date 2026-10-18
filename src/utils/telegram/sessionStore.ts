import {
  clearTelegramStrongholdSession,
  loadTelegramStrongholdSession,
  saveTelegramStrongholdSession,
} from '@/utils/desktopStrongholdSecrets';
import type { TelegramStoredSession } from '@/utils/telegram/types';

function parseSession(raw: string | null): TelegramStoredSession | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<TelegramStoredSession>;
    const apiId = Number(parsed.apiId);
    const apiHash = typeof parsed.apiHash === 'string' ? parsed.apiHash.trim() : '';
    const session = typeof parsed.session === 'string' ? parsed.session : '';
    if (!Number.isFinite(apiId) || apiId <= 0 || !apiHash) return null;
    return { apiId, apiHash, session };
  } catch {
    return null;
  }
}

export async function loadTelegramSession(): Promise<TelegramStoredSession | null> {
  return parseSession(await loadTelegramStrongholdSession());
}

export async function saveTelegramSession(data: TelegramStoredSession): Promise<void> {
  await saveTelegramStrongholdSession(
    JSON.stringify({
      apiId: data.apiId,
      apiHash: data.apiHash,
      session: data.session,
    } satisfies TelegramStoredSession),
  );
}

export async function clearTelegramSession(): Promise<void> {
  await clearTelegramStrongholdSession();
}
