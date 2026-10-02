import { describe, expect, it } from 'vitest';
import {
  buildSettingsOptionSearchEntries,
  filterSettingsPageGroupsFuzzy,
} from '@/utils/settingsPageOptionSearch';
import { SETTINGS_PAGE_GROUPS } from '@/utils/settingsPageCatalog';

describe('settingsPageOptionSearch', () => {
  it('indexes toggle option labels', () => {
    const entries = buildSettingsOptionSearchEntries();
    expect(entries.some((e) => /채팅 입력 자동완성|자동완성/.test(e.label))).toBe(
      true,
    );
    expect(
      entries.some((e) => e.sectionId === 'settings-android-system-status-bar'),
    ).toBe(true);
  });

  it('fuzzy-matches option labels, not only TOC titles', () => {
    const sample = SETTINGS_PAGE_GROUPS.filter((g) =>
      ['chat', 'app', 'ui-navigation'].includes(g.id),
    );
    const { groups, optionHits } = filterSettingsPageGroupsFuzzy(
      sample,
      '자동완성',
    );
    expect(optionHits.some((h) => h.sectionId === 'settings-chat')).toBe(true);
    expect(groups.some((g) => g.id === 'chat')).toBe(true);
  });

  it('fuzzy-matches android status-bar option wording', () => {
    const sample = SETTINGS_PAGE_GROUPS.filter((g) => g.id === 'app');
    const { optionHits } = filterSettingsPageGroupsFuzzy(
      sample,
      '상태표시줄',
    );
    expect(
      optionHits.some((h) => h.sectionId === 'settings-android-system-status-bar'),
    ).toBe(true);
  });
});
