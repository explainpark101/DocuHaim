import { describe, expect, it } from 'vitest';
import {
  HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE,
  buildHaimCodeBlockLanguageOptions,
  filterHaimCodeBlockLanguageOptions,
  haimCodeBlockLanguageDisplayLabel,
  languageAttrFromSelectValue,
  selectValueFromLanguageAttr,
} from '@/components/haimEditor/haimCodeBlockLanguages';

describe('haimCodeBlockLanguages', () => {
  it('maps plain sentinel to null attr and back', () => {
    expect(languageAttrFromSelectValue(HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE)).toBeNull();
    expect(languageAttrFromSelectValue('')).toBeNull();
    expect(languageAttrFromSelectValue('  ')).toBeNull();
    expect(languageAttrFromSelectValue('typescript')).toBe('typescript');
    expect(selectValueFromLanguageAttr(null)).toBe(HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE);
    expect(selectValueFromLanguageAttr('')).toBe(HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE);
    expect(selectValueFromLanguageAttr('js')).toBe('js');
  });

  it('includes plain, mermaid, and highlight languages', () => {
    const opts = buildHaimCodeBlockLanguageOptions();
    const values = opts.map((o) => o.value);
    expect(values[0]).toBe(HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE);
    expect(values).toContain('mermaid');
    expect(values).toContain('javascript');
    expect(values).toContain('python');
    expect(values).not.toContain('plaintext');
  });

  it('appends unknown current language so the list stays complete', () => {
    const opts = buildHaimCodeBlockLanguageOptions('js');
    expect(opts.some((o) => o.value === 'js')).toBe(true);
  });

  it('filters options by query (case-insensitive)', () => {
    const opts = buildHaimCodeBlockLanguageOptions();
    const hit = filterHaimCodeBlockLanguageOptions(opts, 'type');
    expect(hit.map((o) => o.value)).toContain('typescript');
    expect(hit.every((o) => /type/i.test(o.value) || /type/i.test(o.label))).toBe(
      true,
    );
    expect(filterHaimCodeBlockLanguageOptions(opts, '')).toHaveLength(opts.length);
  });

  it('display label uses plain for empty language', () => {
    expect(haimCodeBlockLanguageDisplayLabel('')).toBe('plain');
    expect(haimCodeBlockLanguageDisplayLabel('rust')).toBe('rust');
  });
});
