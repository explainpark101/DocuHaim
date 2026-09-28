import { describe, expect, it } from 'vitest';
import {
  HAIM_CODE_BLOCK_PLAIN_SELECT_VALUE,
  buildHaimCodeBlockLanguageOptions,
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

  it('appends unknown current language so Select stays controlled', () => {
    const opts = buildHaimCodeBlockLanguageOptions('js');
    expect(opts.some((o) => o.value === 'js')).toBe(true);
  });
});
