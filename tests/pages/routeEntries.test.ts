import { describe, expect, it } from 'vitest';
import { APP_PAGE_ENTRIES, FEATURE_QUASI_PAGES } from '@/pages/routeEntries';

describe('pages/routeEntries', () => {
  it('lists formal thin page entries', () => {
    expect(APP_PAGE_ENTRIES).toEqual([
      'SettingsPage',
      'ExportPDFPage',
      'LlmAssistPopoutPage',
    ]);
  });

  it('documents chat as a feature quasi-page', () => {
    expect(FEATURE_QUASI_PAGES).toContain('ChatWithMyselfPane');
  });
});
