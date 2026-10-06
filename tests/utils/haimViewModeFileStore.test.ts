import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  getHaimViewModeFileKeyFromFile,
  loadHaimViewModeForFile,
  peekHaimViewModeForFile,
  resetHaimViewModeFileStoreForTests,
  resolveHaimViewModeForFile,
  saveHaimViewModeForFile,
} from '@/utils/haimViewModeFileStore';
import {
  HAIM_VIEW_MODE_DOUBLE,
  HAIM_VIEW_MODE_SOURCE,
  HAIM_VIEW_MODE_WYSIWYG,
} from '@/utils/haimViewModeSettings';

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
    addEventListener: () => {},
    removeEventListener: () => {},
  });
}

describe('haimViewModeFileStore', () => {
  beforeEach(() => {
    resetHaimViewModeFileStoreForTests();
    stubLocalStorage();
  });

  afterEach(() => {
    resetHaimViewModeFileStoreForTests();
    vi.unstubAllGlobals();
  });

  it('builds a stable key from currentFile', () => {
    expect(
      getHaimViewModeFileKeyFromFile({ type: 's3', id: 'notes/a.md' }),
    ).toBe('s3:notes/a.md');
    expect(
      getHaimViewModeFileKeyFromFile({ type: 'idb', id: 'inbox.md' }),
    ).toBe('idb:inbox.md');
    expect(getHaimViewModeFileKeyFromFile(null)).toBeNull();
    expect(getHaimViewModeFileKeyFromFile({ type: 's3' })).toBeNull();
  });

  it('saves and peeks per-file modes independently', async () => {
    await saveHaimViewModeForFile('s3:a.md', HAIM_VIEW_MODE_DOUBLE, {
      broadcast: false,
    });
    await saveHaimViewModeForFile('s3:b.md', HAIM_VIEW_MODE_SOURCE, {
      broadcast: false,
    });
    expect(peekHaimViewModeForFile('s3:a.md')).toBe(HAIM_VIEW_MODE_DOUBLE);
    expect(peekHaimViewModeForFile('s3:b.md')).toBe(HAIM_VIEW_MODE_SOURCE);
    expect(await loadHaimViewModeForFile('s3:a.md')).toBe(HAIM_VIEW_MODE_DOUBLE);
  });

  it('falls back to the global default when a file has no override', () => {
    window.localStorage.setItem('s3haim_haim_view_mode', HAIM_VIEW_MODE_SOURCE);
    expect(resolveHaimViewModeForFile(null)).toBe(HAIM_VIEW_MODE_SOURCE);
    expect(resolveHaimViewModeForFile(HAIM_VIEW_MODE_DOUBLE)).toBe(
      HAIM_VIEW_MODE_DOUBLE,
    );
    expect(resolveHaimViewModeForFile(undefined)).toBe(HAIM_VIEW_MODE_SOURCE);
  });

  it('ignores invalid modes on save', async () => {
    await saveHaimViewModeForFile(
      's3:a.md',
      'nope' as typeof HAIM_VIEW_MODE_WYSIWYG,
      { broadcast: false },
    );
    expect(peekHaimViewModeForFile('s3:a.md')).toBeUndefined();
  });
});
