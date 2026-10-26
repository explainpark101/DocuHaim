import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  EXPORT_PDF_PAGINATION_MODE_DEFAULT,
  loadExportPdfPaginationMode,
  saveExportPdfPaginationMode,
} from '@/utils/exportPdf/exportPdfPaginationModeSettings';

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

describe('exportPdfPaginationModeSettings', () => {
  beforeEach(() => {
    stubLocalStorage();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('defaults to flow (no paged.js)', () => {
    expect(loadExportPdfPaginationMode()).toBe('flow');
    expect(EXPORT_PDF_PAGINATION_MODE_DEFAULT).toBe('flow');
  });

  it('persists pagedjs and flow', () => {
    saveExportPdfPaginationMode('pagedjs');
    expect(loadExportPdfPaginationMode()).toBe('pagedjs');
    saveExportPdfPaginationMode('flow');
    expect(loadExportPdfPaginationMode()).toBe('flow');
  });

  it('resets unknown stored values to flow', () => {
    window.localStorage.setItem('s3haim_export_pdf_pagination_mode', 'legacy');
    expect(loadExportPdfPaginationMode()).toBe('flow');
    expect(window.localStorage.getItem('s3haim_export_pdf_pagination_mode')).toBe(
      'flow',
    );
  });
});
