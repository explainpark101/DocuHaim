import { describe, expect, it } from 'vitest';
import {
  exportPdfPathnameForStoragePath,
  isChatAppPathname,
  isExportPdfAppPathname,
  isQuizAppPathname,
  isSettingsAppPathname,
  parseExportPdfPathFromAppPathname,
  parseOpenNotePathFromAppPathname,
  parseQuizPathFromAppPathname,
  parseViewPathFromAppPathname,
  quizPathnameForStoragePath,
} from '@/utils/appHref';

describe('appHref route parsers', () => {
  it('parses /view and /export-pdf note paths', () => {
    expect(parseViewPathFromAppPathname('/view/notes/a.md')).toBe('notes/a.md');
    expect(parseExportPdfPathFromAppPathname('/export-pdf/notes/a.md')).toBe('notes/a.md');
    expect(parseOpenNotePathFromAppPathname('/view/x.md')).toBe('x.md');
    expect(parseOpenNotePathFromAppPathname('/export-pdf/x.md')).toBe('x.md');
  });

  it('parses /quiz note paths', () => {
    expect(parseQuizPathFromAppPathname('/quiz/notes/a.quiz.md')).toBe('notes/a.quiz.md');
    expect(parseOpenNotePathFromAppPathname('/quiz/notes/a.quiz.md')).toBe(
      'notes/a.quiz.md',
    );
    expect(isQuizAppPathname('/quiz')).toBe(true);
    expect(isQuizAppPathname('/quiz/a.quiz.md')).toBe(true);
    expect(isQuizAppPathname('/view/a.quiz.md')).toBe(false);
    expect(quizPathnameForStoragePath('notes/a.quiz.md')).toBe('/quiz/notes/a.quiz.md');
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
