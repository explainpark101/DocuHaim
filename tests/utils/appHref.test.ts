import { describe, expect, it } from 'vitest';
import {
  exportPdfPathnameForStoragePath,
  isChatAppPathname,
  isExportPdfAppPathname,
  isSettingsAppPathname,
  parseExportPdfPathFromAppPathname,
  parseOpenNotePathFromAppPathname,
  parseViewPathFromAppPathname,
} from '@/utils/appHref';

describe('appHref route parsers', () => {
  it('parses /view and /export-pdf note paths', () => {
    expect(parseViewPathFromAppPathname('/view/notes/a.md')).toBe('notes/a.md');
    expect(parseExportPdfPathFromAppPathname('/export-pdf/notes/a.md')).toBe('notes/a.md');
    expect(parseOpenNotePathFromAppPathname('/view/x.md')).toBe('x.md');
    expect(parseOpenNotePathFromAppPathname('/export-pdf/x.md')).toBe('x.md');
  });

  it('detects export-pdf / chat / settings pathnames', () => {
    expect(isExportPdfAppPathname('/export-pdf')).toBe(true);
    expect(isExportPdfAppPathname('/export-pdf/a.md')).toBe(true);
    expect(isExportPdfAppPathname('/view/a.md')).toBe(false);
    expect(isChatAppPathname('/chat')).toBe(true);
    expect(isSettingsAppPathname('/settings')).toBe(true);
  });

  it('builds export-pdf pathnames for storage paths', () => {
    expect(exportPdfPathnameForStoragePath('notes/a.md')).toBe('/export-pdf/notes/a.md');
    expect(exportPdfPathnameForStoragePath(null)).toBe('/export-pdf');
  });
});
