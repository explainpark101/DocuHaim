import { describe, expect, it } from 'bun:test';
import {
  buildVisibleSettingsPageGroups,
  filterSettingsPageGroups,
  findSettingsGroupIdForSection,
  resolveSettingsScrollTarget,
  SETTINGS_PAGE_GROUPS,
} from '@/utils/settingsPageCatalog';

describe('settingsPageCatalog', () => {
  it('filters sections by visibility context', () => {
    const groups = buildVisibleSettingsPageGroups({
      isDesktopApp: false,
      showWebAuthnSection: false,
      canScanStorageUsage: false,
    });
    const storageGroup = groups.find((group) => group.id === 'storage-connection');
    expect(storageGroup?.sections.some((section) => section.id === 'settings-desktop-entry-lock')).toBe(
      false,
    );
    expect(storageGroup?.sections.some((section) => section.id === 'settings-storage')).toBe(true);
  });

  it('maps section ids to group ids', () => {
    expect(findSettingsGroupIdForSection('settings-imgbb')).toBe('integrations');
    expect(findSettingsGroupIdForSection('settings-chat')).toBe('chat');
  });

  it('resolves llm hash targets except mlx-vlm', () => {
    expect(resolveSettingsScrollTarget('settings-gemini')).toBe('settings-llm-providers');
    expect(resolveSettingsScrollTarget('settings-mlx-vlm')).toBe('settings-mlx-vlm');
  });

  it('filters toc groups by group title or section label', () => {
    const sample = SETTINGS_PAGE_GROUPS.filter((group) =>
      ['ai', 'integrations'].includes(group.id),
    );
    const byGroup = filterSettingsPageGroups(sample, 'ai');
    expect(byGroup.some((group) => group.id === 'ai')).toBe(true);
    expect(byGroup.find((group) => group.id === 'ai')?.sections.length).toBeGreaterThan(0);

    const bySection = filterSettingsPageGroups(sample, 'imgbb');
    expect(bySection.some((group) => group.id === 'integrations')).toBe(true);
    expect(bySection.find((group) => group.id === 'integrations')?.sections).toHaveLength(1);
  });
});
