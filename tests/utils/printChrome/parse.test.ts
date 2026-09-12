import { describe, expect, it } from 'vitest';
import { createDefaultNoteCover } from '@/utils/noteCover/types';
import { serializeNoteCoverComment } from '@/utils/noteCover/parse';
import {
  formatPrintChromePageLabel,
  normalizePrintChromeDoc,
  parsePrintChrome,
  rebuildLeadingMeta,
  resolvePrintChromePageNumber,
  serializePrintChromeComment,
  stripPrintChromeComment,
  upsertPrintChromeComment,
  createDefaultPageNumberTemplate,
} from '@/utils/printChrome';

describe('printChrome parse', () => {
  it('parses leading print-chrome after note-cover', () => {
    const cover = serializeNoteCoverComment(createDefaultNoteCover());
    const chrome = serializePrintChromeComment({
      v: 1,
      showOnCover: false,
      numbering: 'body',
      templates: [createDefaultPageNumberTemplate({ id: 'pn1', format: '{page}/{total}' })],
    });
    const md = `${cover}\n${chrome}\n\n# Hello\n`;
    const parsed = parsePrintChrome(md);
    expect(parsed.chrome?.templates).toHaveLength(1);
    expect(parsed.chrome?.templates[0]?.type).toBe('page-number');
    expect(parsed.body).toContain('note-cover');
    expect(parsed.body).toContain('# Hello');
    expect(parsed.body).not.toContain('print-chrome');
  });

  it('escapes -- inside JSON payload', () => {
    const comment = serializePrintChromeComment({
      v: 1,
      showOnCover: false,
      numbering: 'body',
      templates: [
        {
          id: 't1',
          type: 'text',
          enabled: true,
          position: 'top-left',
          fontFamily: '',
          fontSizePx: 10,
          text: 'a--b',
        },
      ],
    });
    expect(comment).toContain('\\u002d\\u002d');
    const parsed = parsePrintChrome(`${comment}\nbody`);
    expect(parsed.chrome?.templates[0]).toMatchObject({ type: 'text', text: 'a--b' });
  });

  it('upserts after cover and strips when empty', () => {
    const cover = serializeNoteCoverComment(createDefaultNoteCover());
    const withChrome = upsertPrintChromeComment(`${cover}\n# Hi\n`, {
      v: 1,
      showOnCover: false,
      numbering: 'body',
      templates: [createDefaultPageNumberTemplate({ id: 'x' })],
    });
    expect(withChrome.indexOf('note-cover')).toBeLessThan(withChrome.indexOf('print-chrome'));
    const removed = upsertPrintChromeComment(withChrome, {
      v: 1,
      showOnCover: false,
      numbering: 'body',
      templates: [],
    });
    expect(removed).not.toContain('print-chrome');
    expect(removed).toContain('note-cover');
  });

  it('rebuildLeadingMeta keeps cover then chrome then body', () => {
    const cover = createDefaultNoteCover();
    const out = rebuildLeadingMeta(
      cover,
      {
        v: 1,
        showOnCover: true,
        numbering: 'document',
        templates: [createDefaultPageNumberTemplate({ id: 'n' })],
      },
      '# Body\n',
    );
    expect(out.indexOf('note-cover')).toBeLessThan(out.indexOf('print-chrome'));
    expect(out).toContain('# Body');
  });

  it('normalizes unknown template types away', () => {
    const doc = normalizePrintChromeDoc({
      v: 1,
      templates: [{ type: 'nope' }, { type: 'image', path: 'a.png', widthPx: 20, heightPx: 20 }],
    });
    expect(doc.templates).toHaveLength(1);
    expect(doc.templates[0]?.type).toBe('image');
  });

  it('defaults page-number format to {page}/{total} and keeps placements', () => {
    const t = createDefaultPageNumberTemplate({ id: 'pn' });
    expect(t.format).toBe('{page}/{total}');
    const normalized = normalizePrintChromeDoc({
      v: 1,
      templates: [
        {
          type: 'page-number',
          id: 'pn',
          enabled: true,
          position: 'bottom-center',
          fontFamily: '',
          fontSizePx: 10,
          format: '',
          placement: { xPercent: 50, yPercent: 90 },
          pagePlacements: { 'body:0': { xPercent: 20, yPercent: 80 } },
        },
      ],
    });
    expect(normalized.templates[0]).toMatchObject({
      type: 'page-number',
      format: '{page}/{total}',
      placement: { xPercent: 50, yPercent: 90 },
      pagePlacements: { 'body:0': { xPercent: 20, yPercent: 80 } },
    });
  });

  it('formats tokens and resolves numbering', () => {
    expect(formatPrintChromePageLabel('{page} / {total}', 2, 5)).toBe('2 / 5');
    expect(
      resolvePrintChromePageNumber({
        numbering: 'body',
        bodyIndex: 0,
        bodyPageCount: 3,
        hasCover: true,
      }),
    ).toEqual({ page: 1, total: 3, showPageNumber: true });
    expect(
      resolvePrintChromePageNumber({
        numbering: 'document',
        bodyIndex: 0,
        bodyPageCount: 3,
        hasCover: true,
      }),
    ).toEqual({ page: 2, total: 4, showPageNumber: true });
    expect(
      resolvePrintChromePageNumber({
        numbering: 'body',
        bodyIndex: 0,
        bodyPageCount: 3,
        hasCover: true,
        isCover: true,
      }).showPageNumber,
    ).toBe(false);
  });

  it('stripPrintChromeComment leaves body markdown', () => {
    const chrome = serializePrintChromeComment({
      v: 1,
      showOnCover: false,
      numbering: 'body',
      templates: [createDefaultPageNumberTemplate({ id: 'z' })],
    });
    expect(stripPrintChromeComment(`${chrome}\nHi`)).toBe('Hi');
  });
});
