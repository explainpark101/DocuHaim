import { describe, expect, it, beforeEach, vi } from 'vitest';
import {
  clearAllEditorScrollMemory,
  clearEditorScroll,
  editorScrollMemoryKeyFromFile,
  flushEditorScrollMemory,
  hydrateEditorScrollMemoryFromStorage,
  recallEditorScroll,
  rememberEditorScroll,
} from '@/utils/editorScrollMemory';

const STORAGE_KEY = 's3haim_editor_scroll_v1';

function installMemoryStorage(): void {
  const store = new Map<string, string>();
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
  });
}

function roundTripFromStorage(): void {
  flushEditorScrollMemory();
  const raw = globalThis.localStorage.getItem(STORAGE_KEY);
  clearAllEditorScrollMemory();
  if (raw) globalThis.localStorage.setItem(STORAGE_KEY, raw);
  hydrateEditorScrollMemoryFromStorage();
}

describe('editorScrollMemory', () => {
  beforeEach(() => {
    installMemoryStorage();
    clearAllEditorScrollMemory();
  });

  it('builds a stable key from currentFile', () => {
    expect(editorScrollMemoryKeyFromFile({ type: 's3', id: 'notes/a.md' })).toBe(
      's3:notes/a.md',
    );
    expect(editorScrollMemoryKeyFromFile(null)).toBeNull();
  });

  it('remembers and recalls a snapshot by key', () => {
    rememberEditorScroll('s3:a.md', {
      editorTop: 120,
      editorLeft: 0,
      previewTop: 80,
      previewLeft: 0,
    });
    expect(recallEditorScroll('s3:a.md')).toEqual({
      editorTop: 120,
      editorLeft: 0,
      previewTop: 80,
      previewLeft: 0,
    });
  });

  it('keeps per-file positions independent', () => {
    rememberEditorScroll('s3:a.md', {
      editorTop: 10,
      editorLeft: 0,
      previewTop: 20,
      previewLeft: 0,
    });
    rememberEditorScroll('s3:b.md', {
      editorTop: 99,
      editorLeft: 1,
      previewTop: 88,
      previewLeft: 2,
    });
    expect(recallEditorScroll('s3:a.md')?.editorTop).toBe(10);
    expect(recallEditorScroll('s3:b.md')?.editorTop).toBe(99);
  });

  it('clears one key without touching others', () => {
    rememberEditorScroll('s3:a.md', {
      editorTop: 1,
      editorLeft: 0,
      previewTop: 0,
      previewLeft: 0,
    });
    rememberEditorScroll('s3:b.md', {
      editorTop: 2,
      editorLeft: 0,
      previewTop: 0,
      previewLeft: 0,
    });
    clearEditorScroll('s3:a.md');
    expect(recallEditorScroll('s3:a.md')).toBeNull();
    expect(recallEditorScroll('s3:b.md')?.editorTop).toBe(2);
  });

  it('reloads a snapshot from localStorage after the memory map is cleared', () => {
    rememberEditorScroll('s3:a.md', {
      editorTop: 240,
      editorLeft: 3,
      previewTop: 90,
      previewLeft: 1,
    });
    roundTripFromStorage();
    expect(recallEditorScroll('s3:a.md')).toEqual({
      editorTop: 240,
      editorLeft: 3,
      previewTop: 90,
      previewLeft: 1,
    });
  });

  it('drops the oldest file once the stored cap is exceeded', () => {
    for (let i = 0; i < 81; i += 1) {
      rememberEditorScroll(`s3:n${i}.md`, {
        editorTop: i,
        editorLeft: 0,
        previewTop: 0,
        previewLeft: 0,
      });
    }
    roundTripFromStorage();
    expect(recallEditorScroll('s3:n0.md')).toBeNull();
    expect(recallEditorScroll('s3:n80.md')?.editorTop).toBe(80);
  });
});
