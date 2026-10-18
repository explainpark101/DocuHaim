import { useSyncExternalStore } from 'react';
import { getTelegramSnapshot, subscribeTelegram } from '@/utils/telegram/telegramState';

export function useTelegramSnapshot() {
  return useSyncExternalStore(subscribeTelegram, getTelegramSnapshot, getTelegramSnapshot);
}
