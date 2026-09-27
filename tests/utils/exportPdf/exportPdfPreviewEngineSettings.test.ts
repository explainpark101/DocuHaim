import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  EXPORT_PDF_PREVIEW_ENGINE_DEFAULT,
  loadExportPdfPreviewEngine,
  saveExportPdfPreviewEngine,
} from '@/utils/exportPdf/exportPdfPreviewEngineSettings';
import {
  EDITOR_TYPE_HAIM,
  EDITOR_TYPE_MD_EDITOR_RT,
} from '@/utils/editorTypeSettings';
import { resolvePreviewEngine } from '@/utils/previewEngine';

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

describe('exportPdfPreviewEngineSettings', () => {
  beforeEach(() => {
    stubLocalStorage();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('defaults to auto (follow editor)', () => {
    expect(loadExportPdfPreviewEngine()).toBe('auto');
    expect(EXPORT_PDF_PREVIEW_ENGINE_DEFAULT).toBe('auto');
  });

  it('persists explicit legacy and haim overrides', () => {
    saveExportPdfPreviewEngine('legacy');
    expect(loadExportPdfPreviewEngine()).toBe('legacy');
    saveExportPdfPreviewEngine('haim');
    expect(loadExportPdfPreviewEngine()).toBe('haim');
  });

  it('auto resolves to the note editor type', () => {
    saveExportPdfPreviewEngine('auto');
    expect(resolvePreviewEngine(loadExportPdfPreviewEngine(), EDITOR_TYPE_HAIM)).toBe(
      'haim',
    );
    expect(
      resolvePreviewEngine(loadExportPdfPreviewEngine(), EDITOR_TYPE_MD_EDITOR_RT),
    ).toBe('legacy');
  });

  it('explicit override ignores editor type', () => {
    saveExportPdfPreviewEngine('legacy');
    expect(resolvePreviewEngine(loadExportPdfPreviewEngine(), EDITOR_TYPE_HAIM)).toBe(
      'legacy',
    );
    saveExportPdfPreviewEngine('haim');
    expect(
      resolvePreviewEngine(loadExportPdfPreviewEngine(), EDITOR_TYPE_MD_EDITOR_RT),
    ).toBe('haim');
  });
});
