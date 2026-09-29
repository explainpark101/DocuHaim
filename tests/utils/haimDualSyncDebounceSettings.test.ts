import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  HAIM_DUAL_SYNC_DEBOUNCE_MS_DEFAULT,
  clampHaimDualSyncDebounceMs,
  loadHaimDualSyncDebounceMs,
  saveHaimDualSyncDebounceMs,
} from '@/utils/haimDualSyncDebounceSettings';

function stubLocalStorage() {
  const map = new Map<string, string>();
  const storage = {
    getItem: (key: string) => map.get(key) ?? null,
    setItem: (key: string, value: string) => {
      map.set(key, String(value));
    },
    removeItem: (key: string) => {
      map.delete(key);
    },
    clear: () => map.clear(),
  };
  vi.stubGlobal('localStorage', storage);
  vi.stubGlobal('window', {
    localStorage: storage,
    dispatchEvent: () => true,
  });
}

describe('clampHaimDualSyncDebounceMs', () => {
  it('defaults non-finite values', () => {
    expect(clampHaimDualSyncDebounceMs(Number.NaN)).toBe(
      HAIM_DUAL_SYNC_DEBOUNCE_MS_DEFAULT,
    );
  });

  it('allows 0 for immediate sync', () => {
    expect(clampHaimDualSyncDebounceMs(0)).toBe(0);
  });

  it('defaults to 150', () => {
    expect(HAIM_DUAL_SYNC_DEBOUNCE_MS_DEFAULT).toBe(150);
  });

  it('rounds and clamps to the allowed range', () => {
    expect(clampHaimDualSyncDebounceMs(149.6)).toBe(150);
    expect(clampHaimDualSyncDebounceMs(-10)).toBe(0);
    expect(clampHaimDualSyncDebounceMs(99999)).toBe(2000);
  });
});

describe('loadHaimDualSyncDebounceMs / saveHaimDualSyncDebounceMs', () => {
  beforeEach(() => {
    stubLocalStorage();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('defaults to 150ms when unset', () => {
    expect(loadHaimDualSyncDebounceMs()).toBe(150);
  });

  it('persists and reloads a custom delay including 0', () => {
    saveHaimDualSyncDebounceMs(0);
    expect(loadHaimDualSyncDebounceMs()).toBe(0);
    saveHaimDualSyncDebounceMs(300);
    expect(loadHaimDualSyncDebounceMs()).toBe(300);
  });
});
