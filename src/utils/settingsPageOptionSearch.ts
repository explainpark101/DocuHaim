/**
 * Settings page fuzzy search index — TOC sections + in-page option labels.
 */

import {
  SETTINGS_TOGGLE_DEFS,
  type SettingsToggleId,
} from '@/utils/advancedSearch/settingsToggles';
import { fuzzyMatchText } from '@/utils/chatWithMyself/fuzzyMatchCore';
import type { SettingsPageGroupDef } from '@/utils/settingsPageCatalog';

export type SettingsOptionSearchEntry = {
  /** DOM / catalog section to scroll to. */
  sectionId: string;
  /** User-facing option name. */
  label: string;
  keywords: string[];
};

/**
 * Map Advanced Search toggle ids → settings page section anchors.
 * Options without a section stay searchable via their nearest group section.
 */
const TOGGLE_TO_SECTION: Partial<Record<SettingsToggleId, string>> = {
  'settings-haim-double': 'settings-editor',
  'settings-haim-double-scroll-sync': 'settings-editor',
  'settings-haim-toc-dock': 'settings-editor',
  'settings-haim-focus-outline': 'settings-editor',
  'settings-haim-prose-width-clamp': 'settings-editor',
  'settings-haim-link-open-on-click': 'settings-editor',
  'settings-haim-docuhaim-link-icon': 'settings-editor',
  'settings-haim-prose-line-numbers': 'settings-editor',
  'settings-haim-code-line-numbers': 'settings-editor',
  'settings-haim-raw-line-numbers': 'settings-editor',
  'settings-haim-code-wrap': 'settings-editor',
  'settings-base64-image-fold': 'settings-editor',
  'settings-alt-vim': 'settings-navigation',
  'settings-workspace-tabs': 'settings-navigation',
  'settings-show-trash': 'settings-display',
  'settings-show-hidden': 'settings-display',
  'settings-hide-recording': 'settings-display',
  'settings-orphan-image-auto': 'settings-unused-images',
  'settings-tree-sticky': 'settings-display',
  'settings-tree-modified-date': 'settings-display',
  'settings-tree-reveal-on-open': 'settings-display',
  'settings-status-bar-clock': 'settings-display',
  'settings-status-bar-clock-date': 'settings-display',
  'settings-composer-helper': 'settings-chat',
  'settings-composer-autocomplete': 'settings-chat',
  'settings-as-animation': 'settings-advanced-search',
  'settings-as-build-log-auto-scroll': 'settings-advanced-search',
  'settings-as-index': 'settings-inverted-index',
  'settings-as-include-other': 'settings-inverted-index',
  'settings-cover-center-snap': 'settings-cover',
  'settings-cover-object-snap': 'settings-cover',
  'settings-cover-text-outline': 'settings-cover',
  'settings-cover-place-preview': 'settings-cover',
  'settings-tauri-download-save-dialog': 'settings-tauri-download',
  'settings-android-system-status-bar': 'settings-android-system-status-bar',
  'settings-quiz-dock-width-spring': 'settings-quiz',
};

/** Extra option labels that are not toggles (radios / mode cards). */
const EXTRA_OPTION_ENTRIES: SettingsOptionSearchEntry[] = [
  {
    sectionId: 'settings-android-system-status-bar',
    label: '전체화면 (상태 표시줄 덮기)',
    keywords: ['fullscreen', 'immersive', '전체화면', '상태표시줄'],
  },
  {
    sectionId: 'settings-android-system-status-bar',
    label: '상태 표시줄 보이기',
    keywords: ['status bar', 'statusbar', '상태 표시줄', '보이기'],
  },
  {
    sectionId: 'settings-android-system-status-bar',
    label: 'Android 화면 모드',
    keywords: ['android', 'chrome', '화면 모드'],
  },
];

function stripToggleActionSuffix(title: string): string {
  return title
    .replace(/\s*켜기\s*$/u, '')
    .replace(/\s*끄기\s*$/u, '')
    .replace(/\s*모드\s*$/u, '')
    .trim();
}

/** Build searchable option entries (toggles + extras). */
export function buildSettingsOptionSearchEntries(): SettingsOptionSearchEntry[] {
  const fromToggles: SettingsOptionSearchEntry[] = [];
  for (const def of SETTINGS_TOGGLE_DEFS) {
    const sectionId = TOGGLE_TO_SECTION[def.id];
    if (!sectionId) continue;
    const label =
      stripToggleActionSuffix(def.enableTitle) ||
      stripToggleActionSuffix(def.disableTitle) ||
      def.id;
    fromToggles.push({
      sectionId,
      label,
      keywords: [...def.keywords, def.description, def.enableTitle, def.disableTitle],
    });
  }
  return [...fromToggles, ...EXTRA_OPTION_ENTRIES];
}

function haystackMatches(haystacks: string[], query: string): boolean {
  const q = query.trim();
  if (!q) return true;
  return haystacks.some((h) => fuzzyMatchText(String(h || ''), q));
}

export type SettingsFuzzyFilterResult = {
  groups: SettingsPageGroupDef[];
  /** Matching options (for result lists under the search field). */
  optionHits: SettingsOptionSearchEntry[];
};

/**
 * Fuzzy-filter TOC groups by group title, section label, or any option
 * name that belongs to a section in those groups.
 */
export function filterSettingsPageGroupsFuzzy(
  groups: SettingsPageGroupDef[],
  query: string,
  optionEntries: SettingsOptionSearchEntry[] = buildSettingsOptionSearchEntries(),
): SettingsFuzzyFilterResult {
  const normalized = query.trim();
  if (!normalized) {
    return { groups, optionHits: [] };
  }

  const sectionIds = new Set(
    groups.flatMap((g) => g.sections.map((s) => s.id)),
  );

  const optionHits = optionEntries.filter((entry) => {
    if (!sectionIds.has(entry.sectionId) && entry.sectionId !== 'settings-android-system-status-bar') {
      // Still allow android option hits; section may be injected into catalog.
    }
    return haystackMatches([entry.label, ...entry.keywords], normalized);
  });

  const optionSectionIds = new Set(optionHits.map((h) => h.sectionId));

  const filtered: SettingsPageGroupDef[] = [];
  for (const group of groups) {
    const groupMatches = haystackMatches([group.title], normalized);
    const sections = groupMatches
      ? group.sections
      : group.sections.filter(
          (section) =>
            haystackMatches([section.label, section.id], normalized) ||
            optionSectionIds.has(section.id),
        );
    if (sections.length === 0) continue;
    filtered.push({ ...group, sections });
  }

  // If only options matched a section not in filtered groups, still surface options.
  return { groups: filtered, optionHits };
}
