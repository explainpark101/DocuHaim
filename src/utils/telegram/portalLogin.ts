import { invoke } from '@tauri-apps/api/core';
import { isTauriAndroid } from '@/utils/tauriPlatform';

export type TelegramPortalCreds = {
  apiId: number;
  apiHash: string;
  phone: string;
};

export async function requestTelegramPortalCode(phone: string): Promise<void> {
  await invoke('telegram_portal_send_code', {
    phone,
    platform: isTauriAndroid() ? 'android' : 'desktop',
  });
}

export async function confirmTelegramPortalCode(code: string): Promise<TelegramPortalCreds> {
  return invoke<TelegramPortalCreds>('telegram_portal_confirm_code', { code });
}
