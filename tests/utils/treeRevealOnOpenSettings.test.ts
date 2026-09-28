import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  loadTreeRevealOnOpenEnabled,
  saveTreeRevealOnOpenEnabled,
} from '@/utils/treeRevealOnOpenSettings';
import { transferBusyTooltipText } from '@/utils/treeTransferBusy';

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
  vi.stubGlobal('window', { localStorage: storage });
  return storage;
}

describe('treeRevealOnOpenSettings', () => {
  beforeEach(() => {
    stubLocalStorage();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('defaults to enabled', () => {
    expect(loadTreeRevealOnOpenEnabled()).toBe(true);
  });

  it('persists off when saved as false', () => {
    saveTreeRevealOnOpenEnabled(false);
    expect(loadTreeRevealOnOpenEnabled()).toBe(false);
    expect(window.localStorage.getItem('s3haim_tree_reveal_on_open')).toBe('0');
  });

  it('persists on when saved as true', () => {
    saveTreeRevealOnOpenEnabled(false);
    saveTreeRevealOnOpenEnabled(true);
    expect(loadTreeRevealOnOpenEnabled()).toBe(true);
    expect(window.localStorage.getItem('s3haim_tree_reveal_on_open')).toBe('1');
  });
});

describe('transferBusyTooltipText rename', () => {
  it('shows rename-in-progress copy', () => {
    expect(
      transferBusyTooltipText({
        storageType: 'idb',
        path: 'notes/',
        nodeType: 'folder',
        destFolderPath: '',
        action: 'rename',
      }),
    ).toBe('이름 변경 중');
  });
});
