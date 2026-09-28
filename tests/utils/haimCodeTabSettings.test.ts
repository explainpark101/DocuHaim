import { describe, expect, it } from 'vitest';
import {
  HAIM_CODE_TAB_DEFAULT_SETTINGS,
  normalizeHaimCodeTabSettings,
  resolveHaimCodeTabWidth,
} from '@/utils/haimCodeTabSettings';

describe('haimCodeTabSettings', () => {
  it('defaults: python family 4, others 2', () => {
    const s = HAIM_CODE_TAB_DEFAULT_SETTINGS;
    expect(resolveHaimCodeTabWidth('python', s)).toBe(4);
    expect(resolveHaimCodeTabWidth('python-repl', s)).toBe(4);
    expect(resolveHaimCodeTabWidth('mojo', s)).toBe(4);
    expect(resolveHaimCodeTabWidth('javascript', s)).toBe(2);
    expect(resolveHaimCodeTabWidth('js', s)).toBe(2);
    expect(resolveHaimCodeTabWidth('', s)).toBe(2);
  });

  it('respects defaultWidth and pythonFamilyWidth', () => {
    const s = normalizeHaimCodeTabSettings({
      defaultWidth: 3,
      pythonFamilyWidth: 8,
      byLanguage: {},
    });
    expect(resolveHaimCodeTabWidth('rust', s)).toBe(3);
    expect(resolveHaimCodeTabWidth('python', s)).toBe(8);
  });

  it('per-language override wins over family/default', () => {
    const s = normalizeHaimCodeTabSettings({
      defaultWidth: 2,
      pythonFamilyWidth: 4,
      byLanguage: { python: 2, javascript: 4, js: 8 },
    });
    expect(resolveHaimCodeTabWidth('python', s)).toBe(2);
    expect(resolveHaimCodeTabWidth('javascript', s)).toBe(4);
    // alias js → javascript override OR js key
    expect(resolveHaimCodeTabWidth('js', s)).toBe(8);
  });
});
