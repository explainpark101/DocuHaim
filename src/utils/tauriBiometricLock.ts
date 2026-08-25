/**
 * Tauri-only biometric gate (authenticate prompt).
 * Desktop: tauri-plugin-biometry. Mobile: @tauri-apps/plugin-biometric.
 * Secrets live in Stronghold — this module only verifies the user.
 */

import { isTauriApp, isTauriMobilePlatform } from '@/utils/tauriPlatform';

export const TAURI_BIOMETRIC_REASON_UNLOCK = 'Unlock DocuHaim vault';
export const TAURI_BIOMETRIC_REASON_REGISTER = 'Enable biometric unlock for DocuHaim';

type BiometricAuthOptions = {
  allowDeviceCredential?: boolean;
  cancelTitle?: string;
  fallbackTitle?: string;
  title?: string;
  subtitle?: string;
  confirmationRequired?: boolean;
};

async function loadDesktopBiometryApi() {
  return import('@choochmeque/tauri-plugin-biometry-api');
}

async function loadMobileBiometricApi() {
  return import('@tauri-apps/plugin-biometric');
}

export async function isTauriBiometricAvailable(): Promise<boolean> {
  if (!isTauriApp()) return false;
  try {
    if (isTauriMobilePlatform()) {
      const { checkStatus } = await loadMobileBiometricApi();
      const status = await checkStatus();
      return status.isAvailable === true;
    }
    const { checkStatus } = await loadDesktopBiometryApi();
    const status = await checkStatus();
    return status.isAvailable === true;
  } catch {
    return false;
  }
}

export async function promptTauriBiometric(
  reason: string,
  options: BiometricAuthOptions = {},
): Promise<void> {
  if (!isTauriApp()) {
    throw new Error('Biometric unlock is only available in the Tauri app.');
  }
  const authOptions = {
    allowDeviceCredential: false,
    cancelTitle: 'Cancel',
    ...options,
  };
  if (isTauriMobilePlatform()) {
    const { authenticate } = await loadMobileBiometricApi();
    await authenticate(reason, authOptions);
    return;
  }
  const { authenticate } = await loadDesktopBiometryApi();
  await authenticate(reason, authOptions);
}

export function isBiometricUserCancelError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error ?? '');
  return /cancel|abort|user|denied|dismissed/i.test(message);
}
