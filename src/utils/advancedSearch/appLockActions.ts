/**
 * Tauri app entry lock — manual lock action for Advanced Search.
 */

export type AppLockActionId = 'app-lock';

export type AppLockActionHandler = () => void;

type Listener = () => void;

let handler: AppLockActionHandler | null = null;
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

/** Register while the Tauri shell can lock the app (App mount). */
export function registerAppLockAction(fn: AppLockActionHandler | null): () => void {
  handler = typeof fn === 'function' ? fn : null;
  notify();
  return () => {
    if (handler === fn) handler = null;
    notify();
  };
}

export function hasAppLockAction(): boolean {
  return typeof handler === 'function';
}

export function runAppLockAction(): boolean {
  if (!handler) return false;
  try {
    handler();
    return true;
  } catch (err) {
    console.warn('[advancedSearch] app lock action failed', err);
    return false;
  }
}

export function subscribeAppLockAction(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const APP_LOCK_COMMAND = {
  id: 'app-lock' as const,
  title: '앱 잠금',
  description: 'Tauri 앱을 잠그고 비밀번호·생체 인증을 요청합니다',
  keywords: [
    'lock',
    '잠금',
    '앱 잠금',
    'app lock',
    '입장 잠금',
    'tauri',
    'touch id',
    '생체',
    'biometric',
    'screen lock',
  ],
};
