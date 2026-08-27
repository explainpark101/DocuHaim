import { describe, expect, it } from 'vitest';
import { isMarkdownFileOpenForPrint } from '@/utils/desktopMenuBridge';

describe('isMarkdownFileOpenForPrint', () => {
  it('returns false when no file is open', () => {
    expect(isMarkdownFileOpenForPrint(null)).toBe(false);
  });

  it('returns false for non-markdown viewers', () => {
    expect(
      isMarkdownFileOpenForPrint({
        id: 'notes/readme.pdf',
        name: 'readme.pdf',
        type: 'local',
        viewer: 'pdf',
      }),
    ).toBe(false);
  });

  it('returns true for vault markdown files', () => {
    expect(
      isMarkdownFileOpenForPrint({
        id: 'notes/readme.md',
        name: 'readme.md',
        type: 'local',
        viewer: 'markdown',
      }),
    ).toBe(true);
  });

  it('returns true for session markdown tabs', () => {
    expect(
      isMarkdownFileOpenForPrint({
        id: 'untitled.md',
        name: 'untitled.md',
        type: 'session',
        viewer: 'markdown',
      }),
    ).toBe(true);
  });
});
