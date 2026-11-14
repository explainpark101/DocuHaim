import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  loadTreeFileOpenClickMode,
  loadTreeFileOpenOnClickEnabled,
  saveTreeFileOpenClickMode,
  saveTreeFileOpenOnClickEnabled,
  TREE_FILE_OPEN_CLICK,
  TREE_FILE_OPEN_CLICK_MODE_DEFAULT,
  TREE_FILE_OPEN_DBLCLICK,
} from '@/utils/treeFileOpenClickModeSettings';

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

describe('treeFileOpenClickModeSettings', () => {
  beforeEach(() => {
    stubLocalStorage();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('defaults to double-click', () => {
    expect(loadTreeFileOpenClickMode()).toBe(TREE_FILE_OPEN_CLICK_MODE_DEFAULT);
    expect(loadTreeFileOpenClickMode()).toBe(TREE_FILE_OPEN_DBLCLICK);
    expect(loadTreeFileOpenOnClickEnabled()).toBe(false);
  });

  it('persists click and dblclick modes', () => {
    saveTreeFileOpenClickMode(TREE_FILE_OPEN_CLICK);
    expect(loadTreeFileOpenClickMode()).toBe(TREE_FILE_OPEN_CLICK);
    expect(loadTreeFileOpenOnClickEnabled()).toBe(true);

    saveTreeFileOpenOnClickEnabled(false);
    expect(loadTreeFileOpenClickMode()).toBe(TREE_FILE_OPEN_DBLCLICK);
  });
});
