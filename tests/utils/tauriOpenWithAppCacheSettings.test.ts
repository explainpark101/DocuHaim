import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  convertOpenWithAppCacheRetentionValue,
  DEFAULT_OPEN_WITH_APP_CACHE_RETENTION,
  loadOpenWithAppCacheRetentionSettings,
  openWithAppCacheRetentionToMs,
  saveOpenWithAppCacheRetentionSettings,
} from '@/utils/tauriOpenWithAppCacheSettings';

function stubLocalStorage() {
  const map = new Map<string, string>();
  const storage = {
    getItem: (k: string) => (map.has(k) ? map.get(k)! : null),
    setItem: (k: string, v: string) => {
      map.set(k, String(v));
    },
    removeItem: (k: string) => {
      map.delete(k);
    },
    clear: () => {
      map.clear();
    },
  };
  vi.stubGlobal('localStorage', storage);
  vi.stubGlobal('window', {
    localStorage: storage,
    dispatchEvent: () => true,
  });
  return storage;
}

describe('tauriOpenWithAppCacheSettings', () => {
  beforeEach(() => {
    stubLocalStorage();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('defaults to 3 months', () => {
    expect(loadOpenWithAppCacheRetentionSettings()).toEqual(
      DEFAULT_OPEN_WITH_APP_CACHE_RETENTION,
    );
    expect(DEFAULT_OPEN_WITH_APP_CACHE_RETENTION).toEqual({ value: 3, unit: 'month' });
  });

  it('persists retention settings', () => {
    saveOpenWithAppCacheRetentionSettings({ value: 12, unit: 'hour' });
    expect(loadOpenWithAppCacheRetentionSettings()).toEqual({ value: 12, unit: 'hour' });
  });

  it('converts retention to milliseconds', () => {
    expect(openWithAppCacheRetentionToMs({ value: 1, unit: 'hour' })).toBe(60 * 60 * 1000);
    expect(openWithAppCacheRetentionToMs({ value: 1, unit: 'day' })).toBe(24 * 60 * 60 * 1000);
    expect(openWithAppCacheRetentionToMs({ value: 3, unit: 'month' })).toBe(
      3 * 30 * 24 * 60 * 60 * 1000,
    );
    expect(openWithAppCacheRetentionToMs({ value: 1, unit: 'year' })).toBe(
      365 * 24 * 60 * 60 * 1000,
    );
  });

  it('converts values across units approximately', () => {
    expect(convertOpenWithAppCacheRetentionValue(3, 'month', 'day')).toBe(90);
    expect(convertOpenWithAppCacheRetentionValue(24, 'hour', 'day')).toBe(1);
  });
});
