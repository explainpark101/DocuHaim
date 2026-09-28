import { describe, expect, it } from 'vitest';
import {
  HAIM_TYPOGRAPHY_DEFAULTS,
  normalizeHaimTypographyOverrides,
  normalizeHaimTypographyRules,
  resolveHaimTypographyRules,
  toTipTapTypographyOptions,
} from '@/utils/haimTypographySettings';
import {
  parseDocumentSettingsMeta,
  serializeDocumentSettingsComment,
  upsertDocumentSettingsMeta,
} from '@/utils/documentSettingsMeta';

describe('haimTypographySettings', () => {
  it('defaults keep quotes off and other rules on', () => {
    expect(HAIM_TYPOGRAPHY_DEFAULTS.doubleQuotes).toBe(false);
    expect(HAIM_TYPOGRAPHY_DEFAULTS.singleQuotes).toBe(false);
    expect(HAIM_TYPOGRAPHY_DEFAULTS.emDash).toBe(true);
    expect(HAIM_TYPOGRAPHY_DEFAULTS.ellipsis).toBe(true);
  });

  it('resolves document overrides over global', () => {
    const global = normalizeHaimTypographyRules({ emDash: true, ellipsis: true });
    const resolved = resolveHaimTypographyRules(global, { emDash: false });
    expect(resolved.emDash).toBe(false);
    expect(resolved.ellipsis).toBe(true);
  });

  it('normalizes overrides to only known boolean keys', () => {
    expect(
      normalizeHaimTypographyOverrides({
        emDash: false,
        nope: true,
        ellipsis: 'yes',
      }),
    ).toEqual({ emDash: false });
    expect(normalizeHaimTypographyOverrides({})).toBeUndefined();
  });

  it('maps rules to TipTap Typography options', () => {
    const opts = toTipTapTypographyOptions({
      ...HAIM_TYPOGRAPHY_DEFAULTS,
      emDash: false,
      doubleQuotes: true,
    });
    expect(opts.emDash).toBe(false);
    expect(opts.openDoubleQuote).toBe('“');
    expect(opts.closeDoubleQuote).toBe('”');
  });
});

describe('document-settings haimTypography', () => {
  it('round-trips overrides in the leading meta comment', () => {
    const md = upsertDocumentSettingsMeta('# Hi\n', {
      v: 1,
      sourceList: { show: true, title: 'Sources' },
      fonts: {
        body: 'Paperozi',
        heading: 'Paperozi',
        bold: 'Paperozi',
        code: 'D2Coding',
      },
      webfontCss: '',
      haimTypography: { emDash: false, ellipsis: true },
    });
    expect(md).toContain('document-settings');
    expect(md).toContain('haimTypography');
    const { meta } = parseDocumentSettingsMeta(md);
    expect(meta?.haimTypography).toEqual({ emDash: false, ellipsis: true });
    expect(meta?.taskCheckbox).toBe('check');
  });

  it('round-trips taskCheckbox status mode', () => {
    const md = upsertDocumentSettingsMeta('# Hi\n', {
      v: 1,
      sourceList: { show: true, title: 'Sources' },
      fonts: {
        body: 'Paperozi',
        heading: 'Paperozi',
        bold: 'Paperozi',
        code: 'D2Coding',
      },
      webfontCss: '',
      taskCheckbox: 'status',
    });
    expect(md).toContain('"taskCheckbox":"status"');
    const { meta } = parseDocumentSettingsMeta(md);
    expect(meta?.taskCheckbox).toBe('status');
  });

  it('omits haimTypography when all rules inherit', () => {
    const comment = serializeDocumentSettingsComment({
      v: 1,
      sourceList: { show: true, title: 'Sources' },
      fonts: {
        body: 'Paperozi',
        heading: 'Paperozi',
        bold: 'Paperozi',
        code: 'D2Coding',
      },
      webfontCss: '',
    });
    expect(comment).not.toContain('haimTypography');
  });
});
