import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('@excalidraw/excalidraw', () => ({
  serializeAsJSON: (
    elements: unknown,
    appState: unknown,
    files: unknown,
    type: string,
  ) =>
    JSON.stringify({
      type: 'excalidraw',
      version: 2,
      source: 'mock',
      elements,
      appState,
      files: files ?? {},
      exportType: type,
    }),
}));

import {
  createEmptyExcalidrawDocument,
  EXCALIDRAW_DOCUMENT_TYPE,
  EXCALIDRAW_DOCUMENT_VERSION,
  parseExcalidrawDocument,
} from '@/utils/excalidrawDocument';
import { serializeExcalidrawDocument } from '@/utils/excalidrawSerialize';

describe('excalidrawDocument', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('creates a minimal valid empty document', () => {
    const raw = createEmptyExcalidrawDocument();
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    expect(parsed.type).toBe(EXCALIDRAW_DOCUMENT_TYPE);
    expect(parsed.version).toBe(EXCALIDRAW_DOCUMENT_VERSION);
    expect(parsed.elements).toEqual([]);
    expect(parsed.files).toEqual({});
    expect(parsed.appState).toMatchObject({ viewBackgroundColor: '#ffffff' });
  });

  it('parses vault JSON into scene data', () => {
    const scene = parseExcalidrawDocument(createEmptyExcalidrawDocument());
    expect(scene.elements).toEqual([]);
    expect(scene.files).toEqual({});
    expect(scene.appState.viewBackgroundColor).toBe('#ffffff');
  });

  it('falls back to empty scene on invalid JSON', () => {
    const scene = parseExcalidrawDocument('{not-json');
    expect(scene.elements).toEqual([]);
    expect(scene.files).toEqual({});
  });

  it('falls back to empty scene on empty string', () => {
    const scene = parseExcalidrawDocument('   ');
    expect(scene.elements).toEqual([]);
  });

  it('round-trips via serializeAsJSON local format', () => {
    const initial = parseExcalidrawDocument(createEmptyExcalidrawDocument());
    const json = serializeExcalidrawDocument(
      initial.elements as never,
      initial.appState as never,
      initial.files as never,
    );
    const again = JSON.parse(json) as Record<string, unknown>;
    expect(again.type).toBe(EXCALIDRAW_DOCUMENT_TYPE);
    expect(again.exportType).toBe('local');
    expect(Array.isArray(again.elements)).toBe(true);
    expect(again.files).toEqual({});
  });
});
