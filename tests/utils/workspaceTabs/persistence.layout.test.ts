import { describe, expect, it, beforeEach, afterEach, vi } from 'vitest';
import {
  collectLeaves,
  countLeaves,
  createSingleLeafLayout,
  fromPersistedPaneNode,
  splitLeaf,
  toPersistedPaneNode,
} from '@/utils/workspaceTabs/paneLayout';
import { toPersistedWorkspaceTabs } from '@/utils/workspaceTabs/persistence';
import {
  LAST_OPEN_TABS_RESTORE_KEY,
  loadLastOpenTabsSnapshot,
} from '@/utils/workspaceTabs/lastOpenTabsRestore';

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
    clear: () => {
      map.clear();
    },
  };
  vi.stubGlobal('localStorage', storage);
  vi.stubGlobal('window', { localStorage: storage });
  return storage;
}

describe('workspace tabs split layout persistence', () => {
  beforeEach(() => {
    stubLocalStorage();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('round-trips a horizontal split through toPersistedWorkspaceTabs', () => {
    const leaf = createSingleLeafLayout(['s3:a.md', 's3:b.md'], 's3:a.md');
    const split = splitLeaf(leaf, leaf.id, 'right', 's3:b.md')!;
    expect(countLeaves(split.layout)).toBe(2);

    const persisted = toPersistedWorkspaceTabs(
      [
        { kind: 'file', storageType: 's3', path: 'a.md' },
        { kind: 'file', storageType: 's3', path: 'b.md' },
      ],
      's3:b.md',
      toPersistedPaneNode(split.layout),
      split.focusedPaneId,
    );

    expect(persisted.version).toBe(2);
    expect(persisted.layout.type).toBe('split');
    if (persisted.layout.type !== 'split') return;
    expect(persisted.layout.direction).toBe('horizontal');
    expect(persisted.layout.ratio).toBe(0.5);

    const left = persisted.layout.children[0];
    const right = persisted.layout.children[1];
    expect(left.type).toBe('leaf');
    expect(right.type).toBe('leaf');
    if (left.type !== 'leaf' || right.type !== 'leaf') return;
    expect(left.tabIds).toEqual(['s3:a.md']);
    expect(right.tabIds).toEqual(['s3:b.md']);
    expect(persisted.focusedPaneId).toBe(right.id);

    const restored = fromPersistedPaneNode(persisted.layout);
    expect(countLeaves(restored)).toBe(2);
    expect(collectLeaves(restored).map((l) => l.tabIds)).toEqual([['s3:a.md'], ['s3:b.md']]);
  });

  it('keeps split layout when focusedPaneId is omitted from stored JSON', () => {
    const leaf = createSingleLeafLayout(['s3:a.md', 's3:b.md'], 's3:a.md');
    const split = splitLeaf(leaf, leaf.id, 'right', 's3:b.md')!;
    const payload = toPersistedWorkspaceTabs(
      [
        { kind: 'file', storageType: 's3', path: 'a.md' },
        { kind: 'file', storageType: 's3', path: 'b.md' },
      ],
      's3:a.md',
      toPersistedPaneNode(split.layout),
      split.focusedPaneId,
    );

    window.localStorage.setItem(
      LAST_OPEN_TABS_RESTORE_KEY,
      JSON.stringify({
        version: 2,
        tabs: payload.tabs,
        activeId: payload.activeId,
        layout: payload.layout,
        // focusedPaneId intentionally omitted
      }),
    );

    const loaded = loadLastOpenTabsSnapshot();
    expect(loaded).not.toBeNull();
    expect(loaded!.layout.type).toBe('split');
    if (loaded!.layout.type !== 'split') return;
    const left = loaded!.layout.children[0];
    const right = loaded!.layout.children[1];
    expect(left.type).toBe('leaf');
    expect(right.type).toBe('leaf');
    if (left.type !== 'leaf' || right.type !== 'leaf') return;
    expect(left.tabIds).toEqual(['s3:a.md']);
    expect(right.tabIds).toEqual(['s3:b.md']);
    expect(typeof loaded!.focusedPaneId).toBe('string');
  });

  it('preserves layout when toPersistedWorkspaceTabs is called without focusedPaneId', () => {
    const leaf = createSingleLeafLayout(['s3:a.md', 's3:b.md'], 's3:a.md');
    const split = splitLeaf(leaf, leaf.id, 'bottom', 's3:b.md')!;
    const persisted = toPersistedWorkspaceTabs(
      [
        { kind: 'file', storageType: 's3', path: 'a.md' },
        { kind: 'file', storageType: 's3', path: 'b.md' },
      ],
      's3:a.md',
      toPersistedPaneNode(split.layout),
      null,
    );
    expect(persisted.layout.type).toBe('split');
    if (persisted.layout.type !== 'split') return;
    expect(persisted.layout.direction).toBe('vertical');
  });
});
