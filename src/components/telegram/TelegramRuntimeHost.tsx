import { useEffect } from 'react';
import { isTelegramShell } from '@/utils/telegram/telegramPlatform';

/** Keeps the MTProto socket up while the shell is unlocked, including other routes. */
export default function TelegramRuntimeHost() {
  useEffect(() => {
    if (!isTelegramShell()) return undefined;
    let cancelled = false;
    void import('@/utils/telegram/telegramClient').then((mod) => {
      if (!cancelled) void mod.connectTelegramInBackground();
    });
    return () => {
      cancelled = true;
    };
  }, []);
  return null;
}
